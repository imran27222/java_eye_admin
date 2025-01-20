import React, { useState, useEffect } from "react";
import api from "../../utils/adminAxios";

const WithdrawRequests = () => {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [modalData, setModalData] = useState(null);

  useEffect(() => {
    fetchRequests();
  }, [currentPage, searchTerm, statusFilter]);

  const fetchRequests = async () => {
    try {
      const response = await api.get("/withdraw/all", {
        params: {
          ...(searchTerm?.length > 0 ? { search: searchTerm } : {}),
          ...(statusFilter?.length > 0 ? { status: statusFilter } : {}),
          page: currentPage,
          limit: 10, // Set your page size
        },
      });
      setRequests(response.data.withdrawals);
      setTotalPages(response.data.pagination?.total_pages ?? 1);
    } catch (error) {
      console.error("Error fetching withdraw requests:", error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await api.put(`/withdraw/${id}`, {
        status: "confirmed",
      });
      fetchRequests();
      setModalData(null); // Close modal after action
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  const handleCancel = async (id) => {
    try {
      await api.put(`/withdraw/${id}`, {
        status: "rejected",
      });
      fetchRequests();
      setModalData(null); // Close modal after action
    } catch (error) {
      console.error("Error canceling request:", error);
    }
  };

  const openModal = (action, request) => {
    setModalData({ action, request });
  };

  const closeModal = () => {
    setModalData(null);
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
            <th className="border border-gray-300 px-4 py-2">Wallet Address</th>
            <th className="border border-gray-300 px-4 py-2">Wallet Type</th>
            <th className="border border-gray-300 px-4 py-2">Amount (USDT)</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            {(statusFilter === "pending" || statusFilter === "") && <th className="border border-gray-300 px-4 py-2">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td className="border border-gray-300 px-4 py-2">{request.userName}</td>
              <td className="border border-gray-300 px-4 py-2">{request.email}</td>
              <td className="border border-gray-300 px-4 py-2">{request.wallet_address}</td>
              <td className="border border-gray-300 px-4 py-2">{request.wallet_type}</td>
              <td className="border border-gray-300 px-4 py-2">{request.withdraw_amount}</td>
              <td className="border border-gray-300 px-4 py-2">{request.status}</td>
              {(statusFilter === "pending" || statusFilter === "") && (
                <td className="border border-gray-300 px-4 py-2">
                  {request.status === "pending" && (
                    <>
                      <button onClick={() => openModal("approve", request)} className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2">
                        Approve
                      </button>
                      <button onClick={() => openModal("cancel", request)} className="bg-red-500 text-white px-4 py-2 rounded-lg">
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

      {/* Modal */}
      {modalData && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-4">{modalData.action === "approve" ? "Approve Withdrawal" : "Cancel Withdrawal"}</h2>
            <p className="mb-4">
              Are you sure you want to {modalData.action} this withdrawal request for <strong>{modalData.request.userName}</strong>?
            </p>
            <div className="flex justify-end">
              <button onClick={closeModal} className="px-4 py-2 bg-gray-300 text-black rounded-lg mr-2">
                Cancel
              </button>
              <button onClick={() => (modalData.action === "approve" ? handleApprove(modalData.request.id) : handleCancel(modalData.request.id))} className={`px-4 py-2 ${modalData.action === "approve" ? "bg-green-500" : "bg-red-500"} text-white rounded-lg`}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WithdrawRequests;
