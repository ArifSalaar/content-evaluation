import React, { useState } from 'react'
import ResetLogo from "../WelCome/Assets/WelcomeLogo.png";
import Reseticon from "./Assets/Reseticon.png";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    return (
        <div className="w-full h-screen flex flex-col lg:flex-row">
            {/* Left Side */}
            <div className="w-full lg:w-1/2 h-1/3 lg:h-full bg-[#db5422]  hidden lg:flex items-center justify-center  p-8">
                <motion.img
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    src={ResetLogo}
                    alt="ResetLogo"
                    className="max-h-full object-contain  "
                />
            </div>

            {/* Right side */}
            <div className="w-full lg:w-1/2 h-screen overflow-y-auto flex flex-col items-center text-center justify-center px-5 xl:px-3 py-10">
                <div className=" text-center">
                    <motion.img
                        animate={{ y: [0, -20, 0] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        src={Reseticon} alt="Reset Icon" className="mx-auto h-24 mb-6" />

                    <motion.h2
                        initial={{ y: 200, }}
                        animate={{ y: 0, }}
                        transition={{ duration: 1 }}
                        className="text-3xl md:text-4xl font-semibold mb-2">Reset Password</motion.h2>
                    <p className="text-sm md:text-base text-[#808080] mb-6">
                        Create a new password for your account by filling out the form below.
                    </p>

                    {/* Password Field */}
                    <div className="mb-5 text-left w-full">
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                placeholder="************"
                                className="w-full border border-[#E6E6E6] rounded-md px-4 py-3 pr-10 text-sm placeholder-[#ADB3B7] focus:outline-none focus:ring-1 focus:ring-orange-500"
                            />
                            <div
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                            >
                                {showPassword ? <FaEye className="h-4 w-4" /> : <FaEyeSlash className="h-4 w-4" />}
                            </div>
                        </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="mb-10 text-left w-full">
                        <label className="block text-sm font-medium mb-1">Confirm Password</label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="************"
                                className="w-full border border-[#E6E6E6] rounded-md px-4 py-3 pr-10 text-sm placeholder-[#ADB3B7] focus:outline-none focus:ring-1 focus:ring-orange-500"
                            />
                            <div
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                            >
                                {showConfirmPassword ? <FaEye className="h-4 w-4" /> : <FaEyeSlash className="h-4 w-4" />}
                            </div>
                        </div>
                    </div>

                    {/* Buttons */}
                    <motion.div
                        initial={{ y: 200 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1 }}
                        className="space-y-3 flex flex-col items-center"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            className="w-full md:w-3/4"
                        >
                            <Link
                                to=""
                                className="block bg-[#db5422] text-white py-3 rounded-lg font-medium  transition text-center"
                            >
                                Reset Password
                            </Link>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            className="w-full md:w-3/4"
                        >
                            <Link
                                to="/login"
                                className="block border border-[#E6E6E6] py-3 shadow-sm rounded-lg font-medium text-sm hover:bg-gray-50 transition text-center"
                            >
                                ← Go Back
                            </Link>
                        </motion.div>
                    </motion.div>

                </div>
            </div>

        </div>
    )
}

export default ResetPassword
