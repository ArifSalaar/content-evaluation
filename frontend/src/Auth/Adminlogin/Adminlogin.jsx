import React, { useState } from 'react';
import LoginLogo from "../WelCome/Assets/WelcomeLogo.png";
import { motion } from 'framer-motion';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from 'react-router-dom';


const Adminlogin = () => {
    const [selectedRole, setSelectedRole] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const MotionLink = motion(Link);

    const handleLogin = () => {
        if (!selectedRole) {
            alert('Please select a login type!');
            return;
        }
        // Handle login logic here
        console.log({ email, password, role: selectedRole });
    };

    return (
        <div className="w-full h-screen flex flex-col lg:flex-row">
            {/* Left Side */}
            <div className="w-full lg:w-1/2 h-1/3 lg:h-full bg-[#db5422] hidden md:flex items-center justify-center p-8">
                <motion.img
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    src={LoginLogo}
                    alt="LoginLogo"
                    className="max-h-full object-contain"
                />
            </div>

            {/* Right Side */}
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="w-full lg:w-1/2 h-screen overflow-y-auto flex flex-col items-center text-center justify-center md:justify-start lg:justify-center px-5 md:px-3 py-10"
            >
                <motion.h1
                    initial={{ y: -30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8 }}
                    className="text-2xl md:text-4xl font-bold text-gray-800 mb-6"
                >
                    Welcome back!
                </motion.h1>

                <motion.p
                    initial={{ y: 200 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-sm text-center text-[#808080] mb-6"
                >
                    Please sign in to access your account and continue where you left off.<br />
                    We’re glad to have you back!

                </motion.p>

               
                {/* Email Input */}
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full md:w-3/4 p-3 border border-gray-300 rounded-xl mb-4 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
                {/* Password Input */}
                <div className="w-full md:w-3/4 mb-4">
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="w-full placeholder-[#ADB3B7] border border-gray-300 rounded-xl  p-3 pr-10 focus:outline-none focus:ring-1 focus:ring-orange-500"
                        />
                        <div
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer text-gray-500"
                        >
                            {showPassword ? <FaEye className="h-4 w-4" /> : <FaEyeSlash className="h-4 w-4" />}
                        </div>
                    </div>
                    {/* <motion.div
                        initial={{ x: 200 }}
                        animate={{ x: 0 }}
                        transition={{ duration: 1 }}
                        className="text-right mt-1"
                    >
                        <Link to="/Forgot" className="text-sm text-orange-500 hover:underline">Forgot Password?</Link>
                    </motion.div> */}
                </div>



                {/* Login Button */}
                <MotionLink
                    to="/Dashboard"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-[#db5422] mt-5 text-white w-full md:w-1/2 py-3 cursor-pointer text-lg rounded-xl hover:bg-[#c64619] transition text-center"
                >
                    Login
                </MotionLink>
                {/* Signup Link */}
                {/* <p className="text-sm text-gray-600 mt-3">
                    Don’t have an account?{" "}
                    <Link
                        to="/welcome"
                        className="text-[#db5422] font-semibold hover:underline"
                    >
                        Sign up
                    </Link>
                </p> */}
            </motion.div>
        </div>
    );
};

export default Adminlogin;
