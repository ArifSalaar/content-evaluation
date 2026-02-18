import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import DetailUsersModal from "../AllUsers/Modals/DetailUsersModal";

const Dashboard = () => {
  // Dashboard stats
  const [stats, setStats] = useState([
    { label: "Total Evaluators", value: "0" },
    { label: "Total Teams", value: "0" },
    { label: "Total Submissions", value: "0" },
  ]);

  // State management
  const [evaluators, setEvaluators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewType, setViewType] = useState("pending"); // default view
  const [openModal, setOpenModal] = useState(false);
  const [selectedEvaluator, setSelectedEvaluator] = useState(null);

  // =====================
  // 🧠 Fetch Dashboard Data (Total Stats)
  // =====================
  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/admin/dashboard-data", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const { totalEvaluators, totalTeams, totalSubmissions } = res.data.data;

      

      // ✅ Update Stats
      setStats([
        { label: "Total Evaluators", value: totalEvaluators },
        { label: "Total Teams", value: totalTeams },
        { label: "Total Submissions", value: totalSubmissions },
      ]);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // =====================
  // 🧩 Fetch Evaluators by Approval Status
  // =====================
  const fetchEvaluators = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");

      // Dynamic API endpoint (based on approval status)
      const endpoint =
        viewType === "pending"
          ? "http://localhost:5000/api/admin/evaluators?approved=false"
          : "http://localhost:5000/api/admin/evaluators?approved=true";

      const res = await axios.get(endpoint, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setEvaluators(res.data.data || []);
      console.log("Evaluators:", res.data.data);
    } catch (error) {
      console.error("Error fetching evaluators:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvaluators();
  }, [viewType]); // Re-fetch on tab switch

  // =====================
  // 🔹 Modal Handlers
  // =====================
  const handleOpenModal = (evaluator) => {
    setSelectedEvaluator(evaluator);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedEvaluator(null);
    setOpenModal(false);
  };

  // =====================
  // 🧱 Render
  // =====================
  return (
    <div className="lg:ml-[280px] px-4 lg:px-6 py-3 lg:py-5">
      {/* Header */}
      <motion.h1
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="text-[28px] md:text-[42px] font-semibold text-[#1a1a1a] mb-8"
      >
        Dashboard Overview
      </motion.h1>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-10">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.2, type: "spring" }}
            className="bg-white rounded-[10px] border-[1.5px] py-8 px-8 border-[#e5e5e5] shadow-sm flex flex-col justify-between"
          >
            <p className="text-[#808080] font-[400] text-[22px]">{stat.label}</p>
            <h2 className="text-[#000000] text-[44px] font-bold">
              {loading ? "..." : stat.value}
            </h2>
          </motion.div>
        ))}
      </div>

      {/* Evaluator Tabs */}
      <div className="flex items-center gap-4 mb-5">
        <button
          onClick={() => setViewType("pending")}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            viewType === "pending"
              ? "bg-[#2469A4] text-white shadow"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Pending Evaluators
        </button>
        <button
          onClick={() => setViewType("approved")}
          className={`px-6 py-2 rounded-lg font-semibold transition ${
            viewType === "approved"
              ? "bg-[#34A853] text-white shadow"
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
        >
          Approved Evaluators
        </button>
      </div>

      {/* Evaluator Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <h2 className="text-2xl font-bold text-[#2469A4] mb-5">
          {viewType === "pending" ? "Pending Evaluators" : "Approved Evaluators"}
        </h2>

        {loading ? (
          <p className="text-gray-600 text-lg">Loading...</p>
        ) : evaluators.length === 0 ? (
          <p className="text-gray-600 text-lg">
            No {viewType} evaluators found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#f8fafc] border-b">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">#</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Email</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Phone</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Qualification</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Experience</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                  <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>



              <tbody>
  {evaluators.map((evaluator, index) => (
    <tr
      key={evaluator._id}
      className="border-b hover:bg-gray-50 transition"
    >
      <td className="py-3 px-4 text-gray-700">{index + 1}</td>
      <td className="py-3 px-4 text-gray-900 font-medium">
        {/* {evaluator?.name || "N/A"} */}
         {evaluator.name || "N/A"}
      </td>
      <td className="py-3 px-4 text-gray-600">
        {evaluator.email || "N/A"}
      </td>
      <td className="py-3 px-4 text-gray-600">
        {evaluator.phone || "N/A"}
      </td>
      <td className="py-3 px-4 text-gray-600">
        {evaluator.qualification || "N/A"}
      </td>
      <td className="py-3 px-4 text-gray-600">
        {evaluator.experience || "N/A"}
      </td>
      <td className="py-3 px-4">
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            evaluator?.approved
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {evaluator?.approved ? "Approved" : "Pending"}
        </span>
      </td>
      <td className="py-3 px-4 text-center">
        <button
          onClick={() => handleOpenModal(evaluator)}
          className="text-white bg-[#2469A4] hover:bg-[#1d5280] px-4 py-1 rounded-md text-sm"
        >
          View Details
        </button>
      </td>
    </tr>
  ))}
</tbody>



              {/* <tbody>
                {evaluators.map((evaluator, index) => (
                  <tr
                    key={evaluator._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="py-3 px-4 text-gray-700">{index + 1}</td>
                    <td className="py-3 px-4 text-gray-900 font-medium">
                      {evaluator?.name || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {evaluator?.email || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {evaluator?.phone || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {evaluator?.qualification || "N/A"}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {evaluator?.experience || "N/A"}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          evaluator?.approved
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {evaluator?.approved ? "Approved" : "Pending"}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => handleOpenModal(evaluator)}
                        className="text-white bg-[#2469A4] hover:bg-[#1d5280] px-4 py-1 rounded-md text-sm"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody> */}


            </table>
          </div>
        )}
      </div>

      {/* Modal */}
      {openModal && selectedEvaluator && (
        <DetailUsersModal
          openModal={openModal}
          onClose={handleCloseModal}
          evaluator={selectedEvaluator}
        />
      )}
    </div>
  );
};

export default Dashboard;








// import React, { useEffect, useState } from "react";
// import { motion } from "framer-motion";
// import axios from "axios";
// import DetailUsersModal from "../AllUsers/Modals/DetailUsersModal";
// const Dashboard = () => {

// const [stats, setStats] = useState([
//     { label: "Total Evaluators", value: "0" },
//     { label: "Total Teams", value: "0" },
//     { label: "Total Submissions", value: "0" },
//   ]);


//   const [evaluators, setEvaluators] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [viewType, setViewType] = useState("pending");
//   const [openModal, setOpenModal] = useState(false);
//   const [selectedEvaluator, setSelectedEvaluator] = useState(null);


//   ///////




//    const fetchDashboardData = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       // 🧠 Fetch dashboard data
//       const res = await axios.get("http://localhost:5000/api/feedback/stats", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const { totalEvaluators, totalTeams, totalSubmissions } = res.data.data;

//       console.log("data is", res.data.data);

//       // ✅ Update stats dynamically
//       setStats([
//         { label: "Total Evaluators", value: totalEvaluators },
//         { label: "Total Teams", value: totalTeams },
//         { label: "Total Submissions", value: totalSubmissions },
//       ]);

//       setEvaluators(res.data.data.evaluators || []);
//     } catch (error) {
//       console.error("Error fetching dashboard data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDashboardData();
//   }, )

  
  
//   const fetchEvaluators = async () => {
//     setLoading(true);
//     try {
//       const token = localStorage.getItem("token");
//       const endpoint =
//         viewType === "pending"
//           ? "http://localhost:5000/api/admin/evaluators/pending"
//           : "http://localhost:5000/api/admin/evaluators/approve";

//       const res = await axios.get(endpoint, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setEvaluators(res.data.data || []);
//       console.log("Response", res.data.data)
//     } catch (error) {
//       console.error("Error fetching evaluators:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEvaluators();
//   }, [viewType]); // 🔹 Refetch whenever user switches tab




  
//   const handleOpenModal = (evaluator) => {
//     setSelectedEvaluator(evaluator);
//     setOpenModal(true);
//   };

//   const handleCloseModal = () => {
//     setSelectedEvaluator(null);
//     setOpenModal(false);
//   };

//   return (
//     <div className="lg:ml-[280px] px-4 lg:px-6 py-3 lg:py-5">
//       {/* Header */}
//       <motion.h1
//         initial={{ y: -50, opacity: 0 }}
//         animate={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.6, type: "spring" }}
//         className="text-[28px] md:text-[42px] font-semibold text-[#1a1a1a] mb-8"
//       >
//         Dashboard Overview
//       </motion.h1>

//       {/* Stats */}


// <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 mb-10">
//         {stats.map((stat, index) => (
//           <motion.div
//             key={index}
//             initial={{ y: -50, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ duration: 0.6, delay: index * 0.2, type: "spring" }}
//             className="bg-white rounded-[10px] border-[1.5px] py-8 px-8 border-[#e5e5e5] shadow-sm flex flex-col justify-between"
//           >
//             <p className="text-[#808080] font-[400] text-[22px]">{stat.label}</p>
//             <h2 className="text-[#000000] text-[44px] font-bold">
//               {loading ? "..." : stat.value}
//             </h2>
//           </motion.div>
//         ))}
//       </div>


    




//       {/* 🔹 Evaluator Tabs */}
//       <div className="flex items-center gap-4 mb-5">
//         <button
//           onClick={() => setViewType("pending")}
//           className={`px-6 py-2 rounded-lg font-semibold transition ${
//             viewType === "pending"
//               ? "bg-[#2469A4] text-white shadow"
//               : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//           }`}
//         >
//           Pending Evaluators
//         </button>
//         <button
//           onClick={() => setViewType("approved")}
//           className={`px-6 py-2 rounded-lg font-semibold transition ${
//             viewType === "approved"
//               ? "bg-[#34A853] text-white shadow"
//               : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//           }`}
//         >
//           Approved Evaluators
//         </button>
//       </div>

//       {/* Evaluator Table */}
//       <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
//         <h2 className="text-2xl font-bold text-[#2469A4] mb-5">
//           {viewType === "pending" ? "Pending Evaluators" : "Approved Evaluators"}
//         </h2>

//         {loading ? (
//           <p className="text-gray-600 text-lg">Loading...</p>
//         ) : evaluators.length === 0 ? (
//           <p className="text-gray-600 text-lg">
//             No {viewType} evaluators found.
//           </p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-[#f8fafc] border-b">
//                   <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
//                     #
//                   </th>
//                   <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
//                     Name
//                   </th>
//                   <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
//                     Email
//                   </th>
//                   <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
//                     Phone
//                   </th>
//                   <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
//                     Qualification
//                   </th>
//                   <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
//                     Experience
//                   </th>
//                   <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">
//                     Status
//                   </th>
//                   <th className="text-center py-3 px-4 text-sm font-semibold text-gray-700">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {evaluators.map((evaluator, index) => (
//                   <tr
//                     key={evaluator._id}
//                     className="border-b hover:bg-gray-50 transition"
//                   >
//                     <td className="py-3 px-4 text-gray-700">{index + 1}</td>
//                     <td className="py-3 px-4 text-gray-900 font-medium">
//                       {evaluator?.user?.name || "N/A"}
//                     </td>
//                     <td className="py-3 px-4 text-gray-600">
//                       {evaluator?.user?.email}
//                     </td>
//                     <td className="py-3 px-4 text-gray-600">
//                       {evaluator?.phone || "N/A"}
//                     </td>
//                     <td className="py-3 px-4 text-gray-600">
//                       {evaluator?.qualification || "N/A"}
//                     </td>
//                     <td className="py-3 px-4 text-gray-600">
//                       {evaluator?.experience || "N/A"}
//                     </td>
//                     <td className="py-3 px-4">
//                       <span
//                         className={`px-3 py-1 rounded-full text-sm font-medium ${
//                           evaluator?.approved
//                             ? "bg-green-100 text-green-700"
//                             : "bg-yellow-100 text-yellow-700"
//                         }`}
//                       >
//                         {evaluator?.approved ? "Approved" : "Pending"}
//                       </span>
//                     </td>
//                     <td className="py-3 px-4 text-center">
//                       <button
//                         onClick={() => handleOpenModal(evaluator)}
//                         className="text-white bg-[#2469A4] hover:bg-[#1d5280] px-4 py-1 rounded-md text-sm"
//                       >
//                         View Details
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Modal */}
//       {openModal && selectedEvaluator && (
//         <DetailUsersModal
//           openModal={openModal}
//           onClose={handleCloseModal}
//           evaluator={selectedEvaluator}
//         />
//       )}
//     </div>
//   );
// };

// export default Dashboard;




