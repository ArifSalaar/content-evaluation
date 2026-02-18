
import React, { useState } from "react";
import RegistrationLogo from "../WelCome/Assets/WelcomeLogo.png";
import { motion } from "framer-motion";
import API from "../../api/api"; 
import { useNavigate } from "react-router-dom"; // ✅ import navigate



const TeamRegistration = () => {
  const navigate = useNavigate();


  const [form, setForm] = useState({
    teamName: "",
    members: [
      { name: "", email: "" },
      { name: "", email: "" },
    ],
    projectTitle: "",
    topic: "",
    projectDescription: "",
    learningOutcomes: "",
    videoLink: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleMemberChange = (index, field, value) => {
    const updatedMembers = [...form.members];
    updatedMembers[index][field] = value;
    setForm({ ...form, members: updatedMembers });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await API.post("/teams/register-team", form);
      console.log("✅ Team registered successfully:", response.data);
      setSuccess("Team registered successfully!");

      setForm({
        teamName: "",
        members: [
          { name: "", email: "" },
          { name: "", email: "" },
        ],
        projectTitle: "",
        topic: "",
        projectDescription: "",
        learningOutcomes: "",
        videoLink: "",
      });

      

// navigate("/Teamdashboard", { state: { teamName: form.teamName } });

navigate("/Teamdashboard", {
  state: {
    teamName: form.teamName,
    projectTitle: form.projectTitle,
    members: form.members, 
  },
});

// localStorage.setItem("teamData", JSON.stringify({
//   teamName: form.teamName,
//   projectTitle: form.projectTitle,
//   members: form.members,
 
// }));

localStorage.setItem(
  "teamData",
  JSON.stringify({
    teamName: form.teamName,
    projectTitle: form.projectTitle,
    members: form.members,
  })
);


    } catch (err) {
      console.error("❌ Registration error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="w-full h-screen flex flex-col lg:flex-row md:overflow-y-hidden">
      {/* Left Side */}
      <div className="w-full lg:w-1/2 h-1/3 lg:h-full bg-[#db5422] hidden md:flex items-center justify-center p-8">
        <motion.img
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          src={RegistrationLogo}
          alt="Welcome Logo"
          className="max-h-full object-contain"
        />
      </div>

      {/* Right Side */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full lg:w-1/2 h-full flex flex-col items-center text-center px-5 md:px-3 py-10 overflow-auto md:mt-5"
      >
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold text-gray-800 mb-8"
        >
          Team Registration
        </motion.h1>

        <form onSubmit={handleSubmit} className="w-full md:px-8 text-left space-y-4">
          {/* Team Info */}
          <input
            type="text"
            name="teamName"
            placeholder="Team Name"
            value={form.teamName}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
          />

          <input
            type="text"
            name="projectTitle"
            placeholder="Project Title"
            value={form.projectTitle}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
          />

          <input
            type="text"
            name="topic"
            placeholder="Project Topic"
            value={form.topic}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
          />

          <textarea
            name="projectDescription"
            placeholder="Project Description"
            value={form.projectDescription}
            onChange={handleChange}
            rows={3}
            className="w-full px-4 py-3 border rounded-xl border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
          />

          <textarea
            name="learningOutcomes"
            placeholder="Learning Outcomes"
            value={form.learningOutcomes}
            onChange={handleChange}
            rows={2}
            className="w-full px-4 py-3 border rounded-xl border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
          />

          <input
            type="text"
            name="videoLink"
            placeholder="Video Link"
            value={form.videoLink}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
          />

          {/* Team Members */}
          <label className="block font-semibold mt-2">Members</label>
          {form.members.map((member, idx) => (
            <div key={idx} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
              <input
                type="text"
                placeholder={`Member ${idx + 1} Name`}
                value={member.name}
                onChange={(e) => handleMemberChange(idx, "name", e.target.value)}
                className="w-full px-4 py-3 border rounded-xl border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
              <input
                type="email"
                placeholder={`Member ${idx + 1} Email`}
                value={member.email}
                onChange={(e) => handleMemberChange(idx, "email", e.target.value)}
                className="w-full px-4 py-3 border rounded-xl border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
          ))}

          {/* Submit */}
          {error && <p className="text-red-500 text-center">{error}</p>}
          {success && <p className="text-green-600 text-center">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-3/4 block mx-auto mt-4 bg-[#db5422] hover:bg-[#c64619] cursor-pointer text-white py-3 rounded-xl text-lg font-medium transition disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Register Team"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default TeamRegistration;


