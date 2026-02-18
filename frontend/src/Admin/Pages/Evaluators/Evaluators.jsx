
import React, { useEffect, useState } from "react";
import axios from "axios";

const Evaluators = () => {
  const [evaluators, setEvaluators] = useState([]);
  const [selectedEvaluator, setSelectedEvaluator] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ✅ Fetch all evaluators (requires token)
  const fetchEvaluators = async () => {
    try {
      const token =
        localStorage.getItem("token") ||
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZmIwOGUyMDRjMjg3ZGFhOTJlM2E0MSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2MTI4MjI3NCwiZXhwIjoxNzY1NjAyMjc0fQ.9mlZ2UTqSYByjnGII9evMCySrcy3PHNiHKiE1dB-Aw0"; // fallback for testing

      const res = await axios.get(
        "http://localhost:5000/api/admin/get-all-evaluators",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEvaluators(res.data);
    } catch (error) {
      console.error("❌ Error fetching evaluators:", error.response?.data || error);
    }
  };

  useEffect(() => {
    fetchEvaluators();
  }, []);

  // ✅ Approve evaluator
  const handleApprove = async () => {
    try {
      const token =
        localStorage.getItem("token") ||
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4ZmIwOGUyMDRjMjg3ZGFhOTJlM2E0MSIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTc2MTI4MjI3NCwiZXhwIjoxNzY1NjAyMjc0fQ.9mlZ2UTqSYByjnGII9evMCySrcy3PHNiHKiE1dB-Aw0"; // fallback for testing

      await axios.put(
        `http://localhost:5000/api/admin/evaluator/${selectedEvaluator._id}/approve`,
        { approved: true },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setShowModal(false);
      fetchEvaluators(); // refresh
    } catch (error) {
      console.error("❌ Error approving evaluator:", error.response?.data || error);
    }
  };

  // ✅ Open modal
  const openModal = (evaluator) => {
    setSelectedEvaluator(evaluator);
    setShowModal(true);
  };

  return (
    <div className="lg:ml-[280px] min-h-screen bg-gray-50 flex justify-center px-6">
     <div className="w-full max-w-16xl p-20">
      <h1 className="text-2xl font-bold mb-4">All Evaluators</h1>

      <table className="min-w-full border border-gray-300 bg-white shadow-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Email</th>
            <th className="border px-4 py-2 text-left">Status</th>
            <th className="border px-4 py-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {evaluators.length > 0 ? (
            evaluators.map((evaluator) => (
              <tr key={evaluator._id}>
                <td className="border px-4 py-2">{evaluator.name}</td>
                <td className="border px-4 py-2">{evaluator.email}</td>
                <td
                  className={`border px-4 py-2 font-semibold ${
                    evaluator.approved ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  {evaluator.approved ? "Approved" : "Pending"}
                </td>
                <td className="border px-4 py-2 text-center">
                  {!evaluator.approved && (
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
                      onClick={() => openModal(evaluator)}
                    >
                      Approve
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No evaluators found.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ✅ Modal */}
      {showModal && selectedEvaluator && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md shadow-lg w-[350px]">
            <h2 className="text-xl font-semibold mb-4">Approve Evaluator</h2>
            <p className="mb-6">
              Are you sure you want to approve{" "}
              <strong>{selectedEvaluator.name}</strong>?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Approve
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Evaluators;
