import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import defaultImage from "../Assets/pic1.png";
import arrowicon from "../Assets/ArrowImg.png";

const DetailUsersModal = ({ openModal, onClose, evaluator }) => {
  if (!openModal) return null;
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef();

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageURL = URL.createObjectURL(file);
      setSelectedImage(imageURL);
    }
  };

  return (
    <motion.div
      className="bg-black/50 backdrop-blur-lg py-3 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full poppins"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <style>{`::-webkit-scrollbar { display: none; }`}</style>
      <div className="flex items-center justify-center w-full min-h-screen">
        <motion.div
          className="bg-[#f4f8fb] w-[95%] sm:w-[35rem] gap-4 relative rounded-xl pb-7 overflow-hidden"
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          transition={{ duration: 0.3 }}
        >
          {/* Header */}
          <div className="bg-white w-full h-[70px] rounded-xl">
            <button onClick={onClose} className="absolute top-5 left-4">
              <img src={arrowicon} alt="Back" className="w-9 cursor-pointer" />
            </button>
            <div className="flex flex-col items-center absolute left-1/2 -translate-x-1/2 md:top-[7%] top-[2%]">
              <img
                src={selectedImage || defaultImage}
                onClick={handleImageClick}
                alt="User"
                className="w-24 h-24 rounded-full object-cover cursor-pointer hover:opacity-90 transition"
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={handleImageChange}
              />
              <h2 className="text-xl sm:text-2xl font-semibold mt-2">
                {evaluator?.user?.name || "Unknown"}
              </h2>
              <p
                className={`py-1 font-[500] text-[17px] px-6 rounded-2xl ${
                  evaluator?.approved
                    ? "bg-[#d9f1e4] text-[#34A853]"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {evaluator?.approved ? "Approved" : "Pending"}
              </p>
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-36 mx-6 bg-[#FFFFFF] p-8 rounded-2xl text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6">
              <div>
                <p className="text-[#ADADAD]">Email:</p>
                <p className="text-black font-medium">
                  {evaluator?.user?.email}
                </p>
              </div>
              <div>
                <p className="text-[#ADADAD]">Phone Number:</p>
                <p className="text-black font-medium">
                  {evaluator?.phone || "N/A"}
                </p>
              </div>
            </div>

            <div className="mt-3">
              <p className="text-[#ADADAD]">Address:</p>
              <p className="text-black font-medium capitalize">
                {evaluator?.address || "Not provided"}
              </p>
            </div>

            <div className="mt-3">
              <p className="text-[#ADADAD]">Qualification:</p>
              <p className="text-black font-medium">
                {evaluator?.qualification || "N/A"}
              </p>
            </div>

            <div className="mt-3">
              <p className="text-[#ADADAD]">Experience:</p>
              <p className="text-black font-medium">
                {evaluator?.experience || "N/A"}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

DetailUsersModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  evaluator: PropTypes.object,
};

export default DetailUsersModal;







// import React, { useState, useRef } from "react";
// import PropTypes from "prop-types";
// import { motion } from "framer-motion";
// import defaultImage from "../Assets/pic1.png";
// import arrowicon from "../Assets/ArrowImg.png";

// const DetailUsersModal = ({ openModal, onClose }) => {
//   if (!openModal) return null;
//   const [selectedImage, setSelectedImage] = useState(null);
//   const fileInputRef = useRef();

//   const handleImageClick = () => {
//     fileInputRef.current.click();
//   };

//   const handleImageChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const imageURL = URL.createObjectURL(file);
//       setSelectedImage(imageURL);
//     }
//   };

//   return (
//     <motion.div
//       className="bg-black/50 backdrop-blur-lg py-3 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-full max-h-full poppins"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       transition={{ duration: 0.3 }}
//     >
//       <style>{`::-webkit-scrollbar { display: none; }`}</style>
//       <div className="flex items-center justify-center w-full min-h-screen">
//         <motion.div
//           className="bg-[#f4f8fb] w-[95%] sm:w-[35rem] gap-4 relative rounded-xl pb-7 rounded-b-2xl overflow-hidden"
//           initial={{ scale: 0.5 }}
//           animate={{ scale: 1 }}
//           exit={{ scale: 0.8 }}
//           transition={{ duration: 0.3 }}
//         >
//           {/* Header */}
//           <div className="bg-white w-full h-[70px] rounded-xl">
//             <button onClick={onClose} className="absolute top-5 left-4">
//               <img src={arrowicon} alt="Back" className="w-9 cursor-pointer" />
//             </button>
//             <div className="flex flex-col  items-center absolute left-1/2 -translate-x-1/2 md:top-[7%] top-[2%]">
//               <img
//                 src={selectedImage || defaultImage}
//                 onClick={handleImageClick}
//                 alt="User"
//                 className="w-24 h-24 rounded-full object-cover cursor-pointer hover:opacity-90 transition"
//               />
//               <input
//                 type="file"
//                 accept="image/*"
//                 ref={fileInputRef}
//                 className="hidden"
//                 onChange={handleImageChange}
//               />
//               <h2 className="text-xl sm:text-2xl font-semibold">
//                 Black, Marvin
//               </h2>
//               <p className="bg-[#d9f1e4]  text-[#34A853] py-1 font-[500] text-[17px] px-6 rounded-2xl">
//                 Active
//               </p>
//             </div>
//           </div>

//           {/* Info Section */}
//           <div className="mt-36 mx-6 bg-[#FFFFFF] p-8 rounded-2xl text-sm">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 gap-x-6">
//               <div>
//                 <p className="text-[#ADADAD]">Email:</p>
//                 <p className="text-black font-medium">sara.cruz@example.com</p>
//               </div>
//               <div>
//                 <p className="text-[#ADADAD]">Phone Number:</p>
//                 <p className="text-black font-medium">(671) 555-0110</p>
//               </div>
//             </div>
//             <div className="mt-3">
//               <p className="text-[#ADADAD]">Address:</p>
//               <p className="text-black font-medium capitalize">
//                 3517 W. Gray St. Utica, Pennsylvania 57867
//               </p>
//             </div>
//           </div>

//           {/* Action Buttons */}
//           {/* <div className="flex justify-center items-center my-5">
//             <button
//               onClick={onClose}
//               className="bg-[#E93F33] w-3/5 text-white text-lg cursor-pointer font-[500] text-[18px] rounded-lg p-3 shadow-md hover:bg-[#d9382d] transition"
//             >
//               Delete
//             </button>
//           </div> */}
//         </motion.div>
//       </div>
//     </motion.div>
//   );
// };

// DetailUsersModal.propTypes = {
//   openModal: PropTypes.bool.isRequired,
//   onClose: PropTypes.func.isRequired,
// };

// export default DetailUsersModal;
