import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TeamSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState({
    _id: "",
    title: "",
    videoLink: "",
    topics: "",
    learningOutcomes: "",
    description: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      const res = await axios.get("http://localhost:5000/api/submissions", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const allSubs = res.data.data || [];

      // Filter submissions by logged-in user
      const userSubs = allSubs.filter(
        (sub) => sub.author._id === user.id || sub.author._id === user._id
      );

      setSubmissions(userSubs);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSubmission = () => navigate("/TeamDashboard");

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this submission?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/submissions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Submission deleted successfully!");
      fetchSubmissions();
    } catch (error) {
      console.error("Error deleting submission:", error);
      alert("Failed to delete submission");
    }
  };

  const openEditModal = (item) => {
    setEditData({
      _id: item._id,
      title: item.title,
      videoLink: item.videoLink,
      topics: item.topics.join(", "),
      learningOutcomes: item.learningOutcomes,
      description: item.description,
    });
    setEditModal(true);
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmission = async () => {
    try {
      const token = localStorage.getItem("token");
      const updatedData = {
        title: editData.title,
        videoLink: editData.videoLink,
        topics: editData.topics.split(",").map((t) => t.trim()),
        learningOutcomes: editData.learningOutcomes,
        description: editData.description,
      };

      await axios.put(
        `http://localhost:5000/api/submissions/${editData._id}`,
        updatedData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Submission updated successfully!");
      setEditModal(false);
      fetchSubmissions();
    } catch (error) {
      console.error("Error updating submission:", error);
      alert("Failed to update submission");
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl text-gray-500">Loading submissions...</p>
      </div>
    );

  return (
    <div className="md:pt-[120px] pt-[90px] px-6 md:px-12 py-8 bg-white min-h-screen space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-orange-500 mb-4 md:mb-0">
          Your Submissions
        </h2>
        <button
          onClick={handleCreateSubmission}
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition"
        >
          + Create Submission
        </button>
      </div>

      {/* Submissions List */}
      {submissions.length > 0 ? (
        submissions.map((item) => (
          <div
            key={item._id}
            className="border border-gray-200 rounded-lg shadow-sm p-5 mb-5 bg-[#FFF8F3]"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{item.title}</h3>
            <p className="text-gray-600 mb-1">
              <strong>Description:</strong> {item.description}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Learning Outcomes:</strong> {item.learningOutcomes}
            </p>
            <p className="text-gray-600 mb-1">
              <strong>Topics:</strong> {item.topics?.join(", ")}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Status:</strong>{" "}
              <span
                className={`ml-1 font-semibold ${
                  item.status === "pending" ? "text-yellow-600" : "text-green-600"
                }`}
              >
                {item.status}
              </span>
            </p>

            <a
              href={item.videoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline block mb-3"
            >
              Watch Video
            </a>

            {/* Assigned Evaluators */}
            {item.assignedEvaluators?.length > 0 && (
              <div className="mb-3">
                <strong>Assigned Evaluators:</strong>
                <ul className="list-disc list-inside">
                  {item.assignedEvaluators.map((evalr) => (
                    <li key={evalr._id}>
                      {evalr.name} | {evalr.email} | {evalr.phone || "N/A"} |{" "}
                      {evalr.qualification || "N/A"} | {evalr.experience || "N/A"}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex gap-3">
              <button
                onClick={() => openEditModal(item)}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-md"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(item._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center py-10 bg-[#FFF8F3] rounded-xl shadow-md">
          <p className="text-gray-600 text-lg mb-4">
            You haven’t created any submissions yet.
          </p>
          <button
            onClick={handleCreateSubmission}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-xl shadow-md transition"
          >
            + Create First Submission
          </button>
        </div>
      )}

      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4 text-orange-600">Edit Submission</h2>
            <div className="space-y-3">
              <input
                type="text"
                name="title"
                value={editData.title}
                onChange={handleEditChange}
                placeholder="Title"
                className="w-full border p-2 rounded-md"
              />
              <input
                type="text"
                name="videoLink"
                value={editData.videoLink}
                onChange={handleEditChange}
                placeholder="Video Link"
                className="w-full border p-2 rounded-md"
              />
              <input
                type="text"
                name="topics"
                value={editData.topics}
                onChange={handleEditChange}
                placeholder="Topics (comma separated)"
                className="w-full border p-2 rounded-md"
              />
              <input
                type="text"
                name="learningOutcomes"
                value={editData.learningOutcomes}
                onChange={handleEditChange}
                placeholder="Learning Outcomes"
                className="w-full border p-2 rounded-md"
              />
              <textarea
                name="description"
                value={editData.description}
                onChange={handleEditChange}
                placeholder="Description"
                className="w-full border p-2 rounded-md"
                rows="4"
              ></textarea>
            </div>

            <div className="flex justify-end gap-3 mt-5">
              <button
                onClick={() => setEditModal(false)}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdateSubmission}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamSubmissions;

