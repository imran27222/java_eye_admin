import React, { useState, useEffect } from "react";
import api from "../../utils/adminAxios";

const DepositRequests = () => {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalImage, setModalImage] = useState(null);
  const [confirmationData, setConfirmationData] = useState(null);
  const [depositedAmount, setDepositedAmount] = useState(""); // New state for deposited amount
  const [errorMessage, setErrorMessage] = useState(""); // To track validation errors

  useEffect(() => {
    fetchRequests();
  }, [currentPage, searchTerm, statusFilter]);

  const fetchRequests = async () => {
    try {
      const response = await api.get("/deposit/all", {
        params: {
          ...(searchTerm?.length > 0 ? { search: searchTerm } : {}),
          ...(statusFilter?.length > 0 ? { status: statusFilter } : {}),
          page: currentPage,
          limit: 10, // Set your page size
        },
      });
      setRequests(response.data.deposits);
      setTotalPages(response.data.pagination?.total_pages ?? 1);
    } catch (error) {
      console.error("Error fetching deposit requests:", error);
    }
  };

  const handleApprove = async (id) => {
    if (!depositedAmount || isNaN(depositedAmount) || depositedAmount <= 0) {
      setErrorMessage("Please enter a valid deposited amount.");
      return;
    }

    try {
      await api.put(`/deposit/${id}`, {
        status: "confirmed",
        amount: depositedAmount, // Send the deposited amount
      });
      fetchRequests();
      closeConfirmation();
    } catch (error) {
      console.error("Error approving request:", error);
      setErrorMessage("An error occurred while approving the request.");
    }
  };

  const handleCancel = async (id) => {
    try {
      await api.put(`/deposit/${id}`, {
        status: "rejected",
      });
      fetchRequests();
      closeConfirmation();
    } catch (error) {
      console.error("Error canceling request:", error);
    }
  };

  const handleProof = (image) => {
    setModalImage(image);
  };

  const openConfirmation = (action, request) => {
    setConfirmationData({ action, request });
    setDepositedAmount(""); // Reset deposited amount when opening the modal
    setErrorMessage(""); // Clear error message
  };

  const closeConfirmation = () => {
    setConfirmationData(null);
    setErrorMessage(""); // Clear error message on closing modal
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div className="p-6">
      {/* Filters */}
      <div className="flex justify-between mb-4">
        <input type="text" placeholder="Search by name or ID" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="px-4 py-2 border rounded-lg w-1/3" />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 border rounded-lg w-1/3">
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Approved</option>
          <option value="rejected">Canceled</option>
        </select>
      </div>

      {/* Table */}
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">Username</th>
            <th className="border border-gray-300 px-4 py-2">Email</th>
            <th className="border border-gray-300 px-4 py-2">Transaction Number</th>
            <th className="border border-gray-300 px-4 py-2">Proof</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            {(statusFilter === "pending" || statusFilter === "") && <th className="border border-gray-300 px-4 py-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td className="border border-gray-300 px-4 py-2">{request.userName}</td>
              <td className="border border-gray-300 px-4 py-2">{request.email}</td>
              <td className="border border-gray-300 px-4 py-2">{request.transaction_number}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button onClick={() => handleProof(request.image)} className="bg-green-400 text-white px-4 py-2 rounded-lg mr-2">
                  Proof
                </button>
              </td>
              <td className="border border-gray-300 px-4 py-2">{request.status}</td>
              {(statusFilter === "pending" || statusFilter === "") && (
                <td className="border border-gray-300 px-4 py-2">
                  {request.status === "pending" && (
                    <>
                      <button onClick={() => openConfirmation("approve", request)} className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2">
                        Approve
                      </button>
                      <button onClick={() => openConfirmation("cancel", request)} className="bg-red-500 text-white px-4 py-2 rounded-lg">
                        Cancel
                      </button>
                    </>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between mt-4">
        <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} className="px-4 py-2 bg-blue-500 text-white rounded-lg" disabled={currentPage === 1}>
          Previous
        </button>
        <span className="self-center text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} className="px-4 py-2 bg-blue-500 text-white rounded-lg" disabled={currentPage === totalPages}>
          Next
        </button>
      </div>

      {/* Proof Modal */}
      {modalImage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg max-w-md w-full">
            <img src={modalImage} alt="Proof" className="w-full h-auto mb-4" />
            <button onClick={closeModal} className="px-4 py-2 bg-red-500 text-white rounded-lg">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmationData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">{confirmationData.action === "approve" ? "Approve Deposit" : "Cancel Deposit"}</h2>
            <p className="mb-4">
              Are you sure you want to {confirmationData.action} this deposit request for
              <strong> {confirmationData.request.userName}</strong>?
            </p>
            {confirmationData.action === "approve" && (
              <div className="mb-4">
                <label htmlFor="depositedAmount" className="block text-sm font-medium text-gray-700">
                  Deposited Amount
                </label>
                <input type="number" id="depositedAmount" value={depositedAmount} onChange={(e) => setDepositedAmount(e.target.value)} className="px-4 py-2 border rounded-lg w-full mt-2" placeholder="Enter deposited amount" />
                {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
              </div>
            )}
            <div className="flex justify-end">
              <button onClick={closeConfirmation} className="px-4 py-2 bg-gray-300 text-black rounded-lg mr-2">
                Cancel
              </button>
              <button onClick={() => (confirmationData.action === "approve" ? handleApprove(confirmationData.request.id) : handleCancel(confirmationData.request.id))} className={`px-4 py-2 ${confirmationData.action === "approve" ? "bg-green-500" : "bg-red-500"} text-white rounded-lg`}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DepositRequests;
