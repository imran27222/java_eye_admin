import React, { useState, useEffect } from "react";
import api from "../../utils/adminAxios";

const WithdrawRequests = () => {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchRequests();
  }, [currentPage, searchTerm, statusFilter]);

  // Fetch withdraw requests from the backend
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

  // Handle Approve button click
  const handleApprove = async (id) => {
    try {
      await api.put(`/withdraw-requests/${id}`, {
        status: "confirmed",
      });
      fetchRequests(); // Reload the data after approval
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  // Handle Cancel button click
  const handleCancel = async (id) => {
    try {
      await api.put(`/withdraw-requests/${id}`, {
        status: "rejected",
      });
      fetchRequests(); // Reload the data after cancellation
    } catch (error) {
      console.error("Error canceling request:", error);
    }
  };

  return (
    <div className="p-6">
      {/* Filters */}
      <div className="flex justify-between mb-4">
        {/* Search */}
        <input type="text" placeholder="Search by name or ID" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="px-4 py-2 border rounded-lg w-1/3" />

        {/* Status Filter */}
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
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">User</th>
            <th className="border border-gray-300 px-4 py-2">Amount</th>
            <th className="border border-gray-300 px-4 py-2">Status</th>
            <th className="border border-gray-300 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td className="border border-gray-300 px-4 py-2">{request.id}</td>
              <td className="border border-gray-300 px-4 py-2">{request.user}</td>
              <td className="border border-gray-300 px-4 py-2">{request.amount}</td>
              <td className="border border-gray-300 px-4 py-2">{request.status}</td>
              <td className="border border-gray-300 px-4 py-2">
                <button onClick={() => handleApprove(request.id)} className="bg-green-500 text-white px-4 py-2 rounded-lg mr-2">
                  Approve
                </button>
                <button onClick={() => handleCancel(request.id)} className="bg-red-500 text-white px-4 py-2 rounded-lg">
                  Cancel
                </button>
              </td>
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
    </div>
  );
};

export default WithdrawRequests;
