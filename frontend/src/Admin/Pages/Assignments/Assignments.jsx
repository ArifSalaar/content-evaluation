import React, { useEffect, useState } from "react";
import axios from "axios";

const Assignments = () => {
  const [submissions, setSubmissions] = useState([]);
  const [evaluators, setEvaluators] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState("");
  const [selectedEvaluators, setSelectedEvaluators] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Fetch submissions
  const fetchSubmissions = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get("http://localhost:5000/api/submissions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubmissions(res.data.data || []);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  };

  // ✅ Fetch all approved evaluators
 const fetchEvaluators = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/api/admin/get-all-evaluators", {
      headers: { Authorization: `Bearer ${token}` },
    });

    
    // ✅ Filter approved evaluators directly from res.data
    const approved = res.data.filter((evalUser) => evalUser.approved === true);
    setEvaluators(approved);
  } catch (error) {
    console.error("Error fetching evaluators:", error);
  }
};

  useEffect(() => {
    fetchSubmissions();
    fetchEvaluators();
  }, []);

  // ✅ Handle assignment
  const handleAssign = async (e) => {
    e.preventDefault();
    if (!selectedSubmission || selectedEvaluators.length === 0) {
      return alert("Please select a submission and at least one evaluator.");
    }

    setLoading(true);
    const token = localStorage.getItem("token");

    try {
      const res = await axios.post(
        `http://localhost:5000/api/admin/assign/${selectedSubmission}`,
        { evaluatorIds: selectedEvaluators },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("✅ Evaluators assigned successfully!");
      console.log("Response:", res.data);
      setSelectedSubmission("");
      setSelectedEvaluators([]);
    } catch (error) {
      console.error("Error assigning evaluators:", error.response?.data || error);
      setMessage("❌ Failed to assign evaluators.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Toggle evaluator selection
  const toggleEvaluatorSelection = (id) => {
    setSelectedEvaluators((prev) =>
      prev.includes(id) ? prev.filter((eid) => eid !== id) : [...prev, id]
    );
  };

  return (
    <div className="lg:ml-[280px] min-h-screen bg-gray-50 flex justify-center px-6">
      <div className="w-full max-w-5xl p-10 bg-white shadow-md rounded-lg mt-10">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Assign Evaluators</h1>

        <form onSubmit={handleAssign} className="space-y-6">
          {/* Select Submission */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Select Submission:
            </label>
            <select
              value={selectedSubmission}
              onChange={(e) => setSelectedSubmission(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="">-- Choose Submission --</option>
              {submissions.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.title} — ({sub.status})
                </option>
              ))}
            </select>
          </div>

          {/* Select Evaluators */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">
              Select Evaluators:
            </label>
            <div className="border border-gray-300 rounded p-3 max-h-60 overflow-y-auto">
              {evaluators.length > 0 ? (
                evaluators.map((evalUser) => (
                  <label
                    key={evalUser._id}
                    className="flex items-center gap-2 mb-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value={evalUser._id}
                      checked={selectedEvaluators.includes(evalUser._id)}
                      onChange={() => toggleEvaluatorSelection(evalUser._id)}
                    />
                    <span>
                      {evalUser.name} — <span className="text-gray-500">{evalUser.email}</span>
                    </span>
                  </label>
                ))
              ) : (
                <p className="text-gray-500">No approved evaluators found.</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? "Assigning..." : "Assign Evaluators"}
            </button>
          </div>
        </form>

        {/* Status message */}
        {message && (
          <p className="mt-4 text-center font-medium text-green-700">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Assignments;






// const Assignments = () => {
//   return (
//     <div>Feedback</div>
//   )
// }

// export default Assignments