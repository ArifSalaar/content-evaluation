import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import DeleteIcon from "../Assets/DeleteIcon.png";

function DeleteUserModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  const modalRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose(); // close modal
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  });

  return (
    <motion.div
      className="bg-black/50 backdrop-blur-lg overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full poppins"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-center p-2 min-h-screen w-full">
        <motion.div
          ref={modalRef}
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-[16px] w-[450px] p-6 flex flex-col items-center justify-center gap-2"
        >
          <div className="">
            <img src={DeleteIcon} className="w-20" />
          </div>

          <h2 className="text-[28px] text-[#301820] font-semibold">
            Delete User
          </h2>
          <p className="text-[#808080] text-center text-[16px] font-[400]">
            Are you sure to Delete this User?
          </p>

          <div className="flex flex-row justify-center items-center gap-3 mt-3 w-full">
            <button
              className=" font-medium text-[18px] p-3 md:px-6 w-1/2 rounded-lg bg-[#f3f3f7] text-black  cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </button>
            <button className="font-medium text-[18px] p-3 md:px-6 w-1/2 rounded-lg text-white bg-[#FF3B30] rounde cursor-pointer">
              Delete
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
DeleteUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default DeleteUserModal;
