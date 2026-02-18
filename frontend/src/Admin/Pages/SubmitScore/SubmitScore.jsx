import React, { useState } from "react";
import axios from "axios";

const SubmitScore = () => {
  const [score, setScore] = useState("");
  const [comments, setComments] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const assignmentId = "68f9f28172f37781e2105e9f"; // example — replace with dynamic ID if needed

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("Missing token! Please log in again.");
        setLoading(false);
        return;
      }

      const res = await axios.put(
        `http://localhost:5000/api/assignments/score/${assignmentId}`,
        { score, comments },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setMessage("✅ Score submitted successfully!");
      setScore("");
      setComments("");
    } catch (error) {
      console.error("Error submitting score:", error);
      setMessage("❌ Failed to submit score. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Submit Score</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block font-semibold mb-1">Score</label>
          <input
            type="number"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Enter score (0–100)"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Comments</label>
          <textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="w-full border p-2 rounded"
            rows="3"
            placeholder="Write evaluator comments..."
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded hover:bg-blue-700 transition"
        >
          {loading ? "Submitting..." : "Submit Score"}
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center font-medium text-gray-700">{message}</p>
      )}
    </div>
  );
};

export default SubmitScore;
