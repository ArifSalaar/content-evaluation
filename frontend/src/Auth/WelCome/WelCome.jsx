import React from 'react';
import WelComeLogo from "./Assets/WelcomeLogo.png";
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';


const WelCome = () => {
    return (
        <div className="w-full h-screen flex flex-col lg:flex-row">
            {/* Left Side */}
            <div className="w-full lg:w-1/2 h-1/3 lg:h-full bg-[#db5422] hidden md:flex items-center justify-center p-8">
                <motion.img
                    animate={{ y: [0, -20, 0] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    src={WelComeLogo} alt="Welcome Logo" className="max-h-full object-contain" />
            </div>

            {/* Right Side */}
            <div className="w-full lg:w-1/2 h-full flex flex-col justify-center items-center text-center px-6 xl:px-20 py-10">
                <motion.h1
                    initial={{ x: 200, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="text-4xl font-bold text-gray-800 mb-8"
                >
                    Welcome to Competition!
                </motion.h1>

                <div className='flex flex-col w-full md:w-auto'>

                    <motion.div
                        className="flex flex-col md:flex-row gap-4 justify-center w-full mb-6"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6, ease: "easeOut" }}
                    >
                        <Link to="/TeamRegistration">
                            <motion.div
                                whileHover={{ scale: 1.08, boxShadow: "0px 8px 20px rgba(219, 84, 34, 0.3)" }}
                                whileTap={{ scale: 0.97 }}
                                className="bg-[#db5422] cursor-pointer w-full md:w-auto text-white px-6 py-3 text-lg rounded-xl hover:bg-[#c64619] transition"

                            >
                                Register as Team
                            </motion.div>
                        </Link>
                        <Link to="/EvaluatorRegistration">
                            <motion.div
                                whileHover={{ scale: 1.08, boxShadow: "0px 8px 20px rgba(219, 84, 34, 0.3)" }}
                                whileTap={{ scale: 0.97 }}
                                className="bg-[#db5422] cursor-pointer w-full md:w-auto text-white px-6 py-3 text-lg rounded-xl hover:bg-[#c64619] transition"

                            >
                                Update Evaluator
                            </motion.div>
                        </Link>
                    </motion.div>

                    {/* <motion.div
                        className="w-full mb-8 flex justify-center"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6, ease: "easeOut" }}
                    >
                        <Link to="/Login" className="w-full ">
                            <motion.div
                                whileHover={{ scale: 1.08, boxShadow: "0px 8px 20px rgba(219, 84, 34, 0.3)" }}
                                whileTap={{ scale: 0.97 }}
                                className="bg-[#db5422] cursor-pointer flex justify-center items-center text-white w-full py-3 text-xl rounded-xl hover:bg-[#c64619] transition"
                            >
                                ////
                            </motion.div>
                        </Link>
                    </motion.div> */}

                </div>
                <motion.p
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1, duration: 0.8 }}
                    className="text-gray-600 text-base leading-relaxed hover:text-[#db5422]"
                >
                    Teams can register online, submit video content along with topic details,
                    and receive evaluations.
                    Track scores and rankings throughout the competition on our user-friendly platform.
                </motion.p>
            </div>

        </div>
    );
};

export default WelCome;
