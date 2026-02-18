

import React, { useEffect, useState } from "react";
import axios from "axios";

const Submissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoLink: "",
    status: "" 
  });

  
  
  // Fetch all submissions
  const fetchSubmissions = async () => {
     const token = localStorage.getItem("token");
    try {
      console.log("Token is ", token);
      const res = await axios.get("http://localhost:5000/api/submissions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSubmissions(res.data.data || []);
    } catch (error) {
      console.error("Error fetching submissions:", error.response?.data || error);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  // ✅ Delete submission
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this submission?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/submissions/${id}`);
      fetchSubmissions();
    } catch (error) {
      console.error("Error deleting submission:", error);
    }
  };


// ✅ Approve submission (no modal)
const handleApprove = async (submissionId) => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.put(
      `http://localhost:5000/api/admin/submission/${submissionId}/status`,
      { status: "approved" },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    console.log("Status updated:", res.data);
    fetchSubmissions(); // refresh after updating
  } catch (error) {
    console.error("Error updating submission status:", error.response?.data || error);
  }
};





// // ✅ Open update modal (for changing submission status)
// const openUpdateModal = (submission) => {
//   setSelectedSubmission(submission);
//   setFormData({
//     status: submission.status || "pending", // prefill current status
//   });
//   setIsUpdateModalOpen(true);
// };





// const handleUpdate = async (e) => {
//   e.preventDefault();
//   try {
//     const token = localStorage.getItem("token");

//     await axios.put(
//       `http://localhost:5000/api/admin/submission/${selectedSubmission._id}/status`,
//       { status: formData.status }, // assuming formData has a 'status' field
//       {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     setIsUpdateModalOpen(false);
//     fetchSubmissions(); // refresh list
//   } catch (error) {
//     console.error("Error updating submission:", error);
//   }
// };



  return (
    <div className="lg:ml-[280px] min-h-screen bg-gray-50 flex justify-center px-6">
      <div className="w-full max-w-20xl p-10 bg-white shadow-md rounded-lg mt-10">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">All Submissions</h1>

        {/* ✅ Submissions Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-left">Title</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Author</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Video</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Topics</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {submissions.length > 0 ? (
                submissions.map((submission) => (
                  <tr key={submission._id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-2 font-medium">
                      {submission.title}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {submission.author?.name || "N/A"}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <a
                        href={submission.videoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Watch
                      </a>
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {submission.topics?.join(", ") || "—"}
                    </td>
                    <td
                      className={`border border-gray-300 px-4 py-2 font-semibold ${
                        submission.status === "approved"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {submission.status}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 flex space-x-3">
<button
  onClick={() => handleApprove(submission._id)}
  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
>
  Approve
</button>


                      {/* <button
                        onClick={() => openUpdateModal(submission)}
                        className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                      >
                        Update
                      </button> */}
                      <button
                        onClick={() => handleDelete(submission._id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500">
                    No submissions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ✅ Update Modal */}
        {isUpdateModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
              <h2 className="text-xl font-bold mb-4">Update Submission</h2>

              <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                  <label className="block font-medium">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                  />
                </div>
                <div>
                  <label className="block font-medium">Video Link</label>
                  <input
                    type="text"
                    value={formData.videoLink}
                    onChange={(e) =>
                      setFormData({ ...formData, videoLink: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                  />
                </div>
                <div>
                  <label className="block font-medium">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                  />
                </div>

                <div className="flex justify-end space-x-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setIsUpdateModalOpen(false)}
                    className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Submissions;

