import React, { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import UnBlock from "../Assets/UnblockUserIcon.png";

function UnBlockUserModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

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
          initial={{ scale: 0.5 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-xl w-[450px] p-6 flex flex-col items-center justify-center gap-2"
        >
          <div className="">
            <img src={UnBlock} className="w-20" />
          </div>

          <h2 className="text-[28px] text-[#301820] font-semibold">
            UnBlock User
          </h2>
          <p className="text-[#808080] text-center text-[16px] font-[400]">
            Are you sure to unblock this user?
          </p>

          <div className="flex flex-row justify-center items-center gap-3 mt-3 w-full">
            <button
              className=" font-[500] text-[18px] p-3 md:px-6 w-1/2 rounded-lg bg-[#f3f3f7] text-black  cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="font-[500]  rounded-lg text-[18px]  p-3 md:px-6 w-1/2 text-black bg-[#e3bb81] rounde cursor-pointer"
            >
              UnBlock
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
UnBlockUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default UnBlockUserModal;
