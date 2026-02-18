import React, { useEffect, useState } from "react";
import axios from "axios";

const Teams = () => {
  const [teams, setTeams] = useState([]);

  // Fetch all teams
  const fetchTeams = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      const res = await axios.get("http://localhost:5000/api/teams/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTeams(res.data.data);
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  // Handle delete team
  const handleDelete = async (teamId) => {
    if (!window.confirm("Are you sure you want to delete this team?")) return;

    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/teams/${teamId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove deleted team from state
      setTeams((prevTeams) => prevTeams.filter((team) => team._id !== teamId));
      alert("Team deleted successfully!");
    } catch (error) {
      console.error("Error deleting team:", error);
      alert("Failed to delete team. Please try again.");
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
     <div className="lg:ml-[280px] min-h-screen bg-gray-50 flex justify-center px-6">
    <div className=" w-full max-w-20xl p-10 bg-white shadow-md rounded-lg mt-10 p-4">
      <h2 className="text-xl font-bold mb-4">All Teams</h2>

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Team Name</th>
            <th className="border p-2">Team Lead</th>
            <th className="border p-2">Project Title</th>
            <th className="border p-2">Topic</th>
                        {/* <th className="border p-2">Description</th> */}


            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teams.length > 0 ? (
            teams.map((team) => (
              <tr key={team._id}>
                <td className="border p-2 text-center">{team.teamName}</td>
                <td className="border p-2 text-center">{team.teamLead?.name}</td>
                <td className="border p-2 text-center">{team.projectTitle}</td>
                <td className="border p-2 text-center">{team.topic}</td>
                {/* <td className="border p-2 text-center">{team.projectDescription}</td> */}


                <td className="border p-2 text-center">
                  <button
                    onClick={() => handleDelete(team._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center p-3 text-gray-500">
                No teams found
              </td>
            </tr>
          )}
        </tbody>
      </table>
     </div>
    </div>
  );
};

export default Teams;


