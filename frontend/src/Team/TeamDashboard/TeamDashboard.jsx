import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CameraIcon } from '@heroicons/react/24/solid';
import avatarImage from "./Assets/ImageAvatar.jpg"; 
import defaultImage from './Assets/images1.jpeg';
import API from "../../api/api.js"; 

const TeamDashboard = () => {
  const [image, setImage] = useState(defaultImage);
  const location = useLocation();
  const [teamName, setTeamName] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({
    title: "",
    videoLink: "",
    topics: "",
    learningOutcomes: "",
    description: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ✅ Load team data from localStorage or location.state
  useEffect(() => {
    if (location.state) {
      const { teamName, projectTitle, members } = location.state;
      const data = { teamName, projectTitle, members };
      localStorage.setItem("teamData", JSON.stringify(data));

      if (teamName) setTeamName(teamName);
      if (projectTitle) setProjectTitle(projectTitle);
      if (Array.isArray(members)) setMembers(members);
    } else {
      const storedData = localStorage.getItem("teamData");
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        setTeamName(parsedData.teamName || "");
        setProjectTitle(parsedData.projectTitle || "");
        setMembers(Array.isArray(parsedData.members) ? parsedData.members : []);
      }
    }
  }, [location.state]);

  // ✅ Image Upload Preview
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // ✅ Input change handler
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Submission form handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("User not authenticated!");
        setLoading(false);
        return;
      }

      const payload = {
        title: form.title,
        videoLink: form.videoLink,
        topics: form.topics,
        learningOutcomes: form.learningOutcomes,
        description: form.description
      };

      const response = await API.post("/submissions", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("✅ Submission created:", response.data);
      setMessage("Submission created successfully!");
      setForm({
        title: "",
        videoLink: "",
        topics: "",
        learningOutcomes: "",
        description: ""
      });

    } catch (error) {
      console.error("❌ Submission error:", error.response?.data || error.message);
      setMessage(error.response?.data?.message || "Failed to create submission!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen md:pt-[120px] pt-[90px] bg-white flex flex-col md:flex-row p-4 md:p-6 gap-10">
      {/* Sidebar */}
      <aside className="w-full h-[650px] md:w-1/3 bg-[#FFF8F3] p-6 rounded-2xl shadow-md">
        <div className="flex flex-col items-center text-center relative">

<img
        src={avatarImage}
        alt="Team Avatar"
        className="w-32 h-32 object-cover rounded-full border-4 border-orange-500 shadow-lg mx-auto"
      />


          {/* <img src={image} alt="Team Logo" className="rounded-full w-24 h-24 object-cover mb-4" /> */}
          <label className="cursor-pointer absolute top-[77px] md:left-[50%] left-[58%] -translate-x-1/2">
            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
          </label>

          <h2 className="text-2xl text-orange-500 font-bold mt-2">{teamName || "Team Name"}</h2>
          <p className="text-sm text-gray-500 mb-5">
            Project: {projectTitle || "Innovation Challenge 2024"}
          </p>

          <div className="w-full text-left">
            <div className="mb-3">
              <p className="font-bold text-xl lg:text-2xl text-[#2469A4]">Team Lead</p>
              <p className="text-black pt-1 text-lg">{}</p>
            </div>

            <div className="mb-3">
              <p className="font-bold text-xl lg:text-2xl text-[#2469A4]">Members</p>
              <ul className="list-disc text-lg list-inside text-black">
                {members.length > 0 ? (
                  members.map((member, index) => (
                    <li key={index}>
                      {member.name ? `${member.name} (${member.email})` : JSON.stringify(member)}
                    </li>
                  ))
                ) : (
                  <li>No members added</li>
                )}
              </ul>
            </div>

            <div className="mb-6">
              <p className="font-bold text-xl lg:text-2xl text-[#2469A4]">Submission Status</p>
              <p className="text-orange-600 text-2xl font-semibold">Pending</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-full md:w-2/3">
        <h1 className="text-3xl font-bold text-orange-500 text-center mb-2">Team Dashboard</h1>
        <p className="text-gray-500 text-center mb-6">Manage team’s submissions and feedback</p>

        <h2 className="text-2xl font-semibold mb-4">Submission Form</h2>

        <form
          onSubmit={handleSubmit}
          className="bg-[#FFF8F3] p-4 mb-6 md:p-6 rounded-2xl shadow-md space-y-4"
        >
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Enter title"
              className="w-full border border-gray-200 outline-none rounded-xl px-4 py-2 bg-white"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-1">Video Link</label>
            <input
              type="text"
              name="videoLink"
              value={form.videoLink}
              onChange={handleChange}
              placeholder="Enter video link"
              className="w-full border border-gray-200 outline-none rounded-xl px-4 py-2 bg-white"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-1">Topics</label>
            <input
              type="text"
              name="topics"
              value={form.topics}
              onChange={handleChange}
              placeholder="Enter topic"
              className="w-full border border-gray-200 outline-none rounded-xl px-4 py-2 bg-white"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-1">Learning Outcomes</label>
            <input
              type="text"
              name="learningOutcomes"
              value={form.learningOutcomes}
              onChange={handleChange}
              placeholder="Enter learning outcomes"
              className="w-full border border-gray-200 outline-none rounded-xl px-4 py-2 bg-white"
            />
          </div>

          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="w-full border border-gray-200 outline-none rounded-xl px-2 py-2 bg-white h-32 resize-none"
            ></textarea>
          </div>

          {message && (
            <p
              className={`text-center font-medium ${
                message.includes("successfully") ? "text-green-600" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-xl shadow-md w-full"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default TeamDashboard;

