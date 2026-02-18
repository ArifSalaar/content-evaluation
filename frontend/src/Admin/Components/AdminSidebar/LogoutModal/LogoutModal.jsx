import React from "react";
import PropTypes from "prop-types";
import { IoClose } from "react-icons/io5";
import logoutmodalimg from "./Assets/logoutmodalimg.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LogoutModal({ openLogoutModal, closeLogoutModal }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.warn("No token found in localStorage");
      } else {
        // 🔹 Call backend logout API
        await axios.post(
          "http://localhost:5000/api/auth/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }

      // 🔹 Clear local storage and redirect to login
      localStorage.clear();
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
      alert("Logout failed. Please try again.");
    } finally {
      closeLogoutModal(); // close modal after attempt
    }
  };

  if (!openLogoutModal) return null;

  return (
    <div className="bg-black/50 backdrop-blur-lg overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full">
      <div className="flex items-center justify-center w-full min-h-screen p-4">
        <div className="bg-white w-full max-w-2xl py-5 sm:max-w-lg mx-auto rounded-xl relative shadow-lg">
          <IoClose
            onClick={closeLogoutModal}
            className="absolute top-3 right-3 w-6 h-6 cursor-pointer"
          />

          <div className="flex items-center justify-center">
            <img src={logoutmodalimg} alt="Logout" className="h-26" />
          </div>
          <p className="text-center font-semibold mt-4 text-3xl">Log out</p>
          <p className="text-[#808080] text-center py-2">
            Are you sure you want to log out of your account?
          </p>
          <div className="flex items-center justify-center mt-7">
            <button
              onClick={handleLogout}
              className="p-3 text-center bg-[#000000] text-white w-[50%] rounded-lg cursor-pointer hover:bg-gray-800 transition"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

LogoutModal.propTypes = {
  openLogoutModal: PropTypes.bool.isRequired,
  closeLogoutModal: PropTypes.func.isRequired,
};

export default LogoutModal;




// import React from "react";
// import PropTypes from "prop-types";
// import { IoClose } from "react-icons/io5";
// import logoutmodalimg from "./Assets/logoutmodalimg.png";
// import { useNavigate } from "react-router-dom";

// function LogoutModal({ openLogoutModal, closeLogoutModal }) {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/Admin");
//   };

//   if (!openLogoutModal) return null;

//   return (
//     <div className="bg-black/50 backdrop-blur-lg overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full">
//       <div className="flex items-center justify-center w-full min-h-screen p-4">
//         <div className="bg-white w-full max-w-2xl py-5 sm:max-w-lg mx-auto rounded-xl relative shadow-lg">
//           <IoClose
//             onClick={closeLogoutModal}
//             className="absolute top-3 right-3 w-6 h-6 cursor-pointer"
//           />

//           <div className="flex items-center justify-center">
//             <img src={logoutmodalimg} alt="" className="h-26" />
//           </div>
//           <p className="text-center font-semibold mt-4 text-3xl">Log out</p>
//           <p className="text-[#808080] text-center py-2">
//             Are you sure to log out your account?
//           </p>
//           <div className="flex items-center justify-center mt-7">
//             <button
//               onClick={handleLogout}
//               className="p-3 text-center bg-[#000000] text-white w-[50%] rounded-lg cursor-pointer"
//             >
//               Log Out
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// LogoutModal.propTypes = {
//   openLogoutModal: PropTypes.bool.isRequired,
//   closeLogoutModal: PropTypes.func.isRequired,
// };

// export default LogoutModal;
