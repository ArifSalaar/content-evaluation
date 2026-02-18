import React from 'react'
import ForgotLogo from "../WelCome/Assets/WelcomeLogo.png";
import { motion } from 'framer-motion';
import key from "./Assets/key.png"
import { Link } from 'react-router-dom';


const Forgot = () => {
    return (
        <div className="w-full h-screen flex flex-col lg:flex-row">
            {/* Left Side */}
            <div className="w-full lg:w-1/2 h-1/3 lg:h-full bg-[#db5422] hidden lg:flex items-center justify-center p-8">
                <motion.img
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    src={ForgotLogo}
                    alt="ForgotLogo"
                    className="max-h-full object-contain"
                />
            </div>


            <div className="w-full lg:w-1/2 h-screen overflow-y-auto flex flex-col items-center text-center justify-center px-5 md:px-3 py-10">
                <div className="  text-center">
                    <motion.img
                        animate={{ y: [0, -20, 0] }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        src={key} alt="Reset Icon" className="mx-auto bg-white h-24 mb-6" />

                    <motion.h2
                        initial={{ y: 200, }}
                        animate={{ y: 0, }}
                        transition={{ duration: 1 }}
                        className="text-2xl md:text-4xl font-semibold mb-2">Forgot your password?</motion.h2>
                    <p className="text-sm md:text-base text-[#808080] mb-6">
                        Enter your email address below and we'll send you password reset <br /> instructions.
                    </p>

                    {/* Email Field */}
                    <div className="mb-5 text-left w-full">
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <div className="relative">

                            <input
                                type="email"
                                placeholder="hi@example.com"
                                className="w-full border border-[#E6E6E6] rounded-md px-4 py-3 text-sm placeholder-[#ADB3B7] focus:outline-none focus:ring-1 focus:ring-orange-500"
                            />

                        </div>
                    </div>
                    {/* Buttons */}
                    <motion.div
                        initial={{ y: 200 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 1 }}
                        className="space-y-3 flex flex-col items-center pt-6"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            className="md:w-3/4 w-full"
                        >
                            <Link
                                to="/ResetPassword"
                                className="block bg-[#db5422] text-white py-3 rounded-lg font-medium  transition text-center"
                            >
                                Send Reset Instructions
                            </Link>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            className="md:w-3/4 w-full"
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

export default Forgot
