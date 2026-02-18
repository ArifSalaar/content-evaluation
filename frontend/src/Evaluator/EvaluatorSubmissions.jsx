// 📁 src/components/EvaluatorSubmissions.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const EvaluatorSubmissions = () => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  const BASE_URL = "http://localhost:5000/"

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}api/assignments/my-assignments`,
          { withCredentials: true } // ✅ include cookies / token
        );
        setSubmissions(res.data.assignments || []);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSubmissions();
  }, []);

  if (loading)
    return (
      <div className="text-center text-white py-10 text-lg">
        Loading submissions...
      </div>
    );

  if (!submissions.length)
    return (
      <div className="text-center text-white py-10 text-lg">
        No submissions found.
      </div>
    );

    console.log("Submissions:", submissions);
  return (
    <section id="submissions" className="py-16 bg-black/20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl font-bold text-white mb-8 text-center">
          Evaluator Submissions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {submissions.map((submission) => (
            <div
              key={submission._id}
              className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl text-white hover:bg-white/20 transition-all"
            >
              <h3 className="text-2xl font-semibold mb-2">
                {submission.title}
              </h3>
              <p className="text-white/80 mb-3">
                {submission.description || "No description provided."}
              </p>
              <p className="text-sm text-white/70 mb-2">
                <strong>Video:</strong>{" "}
                <a
                  href={submission.videoLink}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-300 underline"
                >
                  Watch
                </a>
              </p>
              <p className="text-sm text-white/70 mb-2">
                <strong>Status:</strong> {submission.status || "Pending"}
              </p>
              <p className="text-sm text-white/70">
                <strong>Score:</strong>{" "}
                {submission.score ? submission.score : "Not scored yet"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EvaluatorSubmissions;
