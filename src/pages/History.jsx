import React, { useState, useEffect } from "react";
import API from "../utils/axios";
import { formatDate } from "../utils/dateFormat";

const History = () => {
  const [activeTab, setActiveTab] = useState("deposit");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(5); // Number of items per page
  const [list, setList] = useState([]);
  const [totalPages, setTotalPages] = useState(1); // Total pages for pagination
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch history data when activeTab, page, or size changes
    const fetchHistory = async () => {
      setLoading(true);
      try {
        const response = await API.get(`/${activeTab}`, {
          params: { page, size },
        });
        if (response.data) {
          if (activeTab === "deposit") {
            setList(response.data.deposits);
          } else {
            setList(response.data.withdrawals);
          }
          setTotalPages(response.data.pagination.total_pages);
        }
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [activeTab, page, size]);

  // Handle tab change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setPage(1); // Reset page to 1 when switching tabs
  };

  // Handle page change
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a202c] flex flex-col items-center p-6">
      <h1 className="text-4xl text-pink-500 font-bold mb-6">HISTORY</h1>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-8">
        <button onClick={() => handleTabChange("deposit")} className={`px-4 py-2 rounded-md text-lg font-medium ${activeTab === "deposit" ? "bg-pink-500 text-white" : "bg-[#2d3748] text-gray-300"} hover:bg-pink-600`}>
          Deposit History
        </button>
        <button onClick={() => handleTabChange("withdraw")} className={`px-4 py-2 rounded-md text-lg font-medium ${activeTab === "withdraw" ? "bg-pink-500 text-white" : "bg-[#2d3748] text-gray-300"} hover:bg-pink-600`}>
          Withdraw History
        </button>
      </div>

      {/* History Content */}
      <div className="w-full max-w-2xl bg-[#2d3748] p-6 rounded-lg shadow-lg">
        {loading ? (
          <div className="text-center text-gray-300">Loading...</div>
        ) : list.length === 0 ? (
          <div className="text-center text-gray-300">No records found.</div>
        ) : (
          <div>
            <h2 className="text-xl text-pink-500 font-semibold mb-4">{activeTab === "deposit" ? "Deposit History" : "Withdraw History"}</h2>
            <ul className="space-y-4">
              {list.map((item, index) => (
                <li key={index} className="flex justify-between items-center bg-[#4a5568] p-4 rounded-md text-gray-200">
                  <span>{item.transaction_number}</span>
                  <span className="text-sm text-gray-400">{formatDate(item.created_at)}</span>
                  {/* <span className="text-sm text-green-400">${item.amount}</span> */}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Pagination Controls */}
        {list.length > 0 && (
          <div className="flex justify-between items-center mt-6">
            <button onClick={() => handlePageChange(page - 1)} disabled={page === 1} className="px-4 py-2 bg-[#4a5568] text-gray-300 rounded-md hover:bg-pink-600 disabled:bg-gray-600">
              Previous
            </button>
            <span className="text-gray-300">
              Page {page} of {totalPages}
            </span>
            <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages} className="px-4 py-2 bg-[#4a5568] text-gray-300 rounded-md hover:bg-pink-600 disabled:bg-gray-600">
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
