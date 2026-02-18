import React, { useState } from 'react';
import EvaluatorLogo from "../WelCome/Assets/WelcomeLogo.png";
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"
import API from "../../api/api.js"; 

const Registration = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: ""
    // qualification: "",
    // experience: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const response = await API.post("/auth/register", form);

    // ✅ Correct destructuring
    const { user, token } = response.data?.data || {};

    if (user && token) {
      // Save to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      console.log("✅ Registered user:", user);

      // ✅ Role-based navigation
      if (user.role === "admin") {
        navigate("/Dashboard");
      } 
      
      // else if (user.role === "teamlead") {
      //   navigate("/Teamdashboard");
      // }
      
      else {
        navigate("/home");
      }
    } else {
      setError("User or token missing in response.");
    }
  } catch (err) {
    console.error("Registration error:", err.response?.data || err.message);
    setError(err.response?.data?.message || "Something went wrong!");
  } finally {
    setLoading(false);
  }
};


  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError("");

  //     try {
  //   const response = await API.post("/auth/register", form);
    

  //   // ✅ Corrected path for token
  //   const token = response.data?.data?.token || response.data?.token;
  //   if (token) {
  //     localStorage.setItem("token", token);
     
  //     navigate("/Page");
  //   } else {
  //     console.warn("⚠️ Token not found in response");
  //   }
  
  // }catch (err) {
  //     console.error("Registration error:", err.response?.data || err.message);
  //     setError(err.response?.data?.message || "Something went wrong!");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="w-full h-screen flex flex-col lg:flex-row">
      {/* Left Side */}
      <div className="w-full lg:w-1/2 h-1/3 lg:h-full bg-[#db5422] hidden md:flex items-center justify-center p-8">
        <motion.img
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          src={EvaluatorLogo}
          alt="EvaluatorLogo"
          className="max-h-full object-contain"
        />
      </div>

      {/* Right Side */}
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full lg:w-1/2 h-screen overflow-y-auto flex flex-col items-center text-center justify-center px-5 md:px-3 py-10"
      >
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-2xl md:text-4xl font-bold text-gray-800 mb-8"
        >
          Sign Up
        </motion.h1>

        <form onSubmit={handleSubmit} className="w-full md:px-8 text-left space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
          />
          <input
            type="text"
            name="role"
            placeholder="Role"
            value={form.role}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-3/4 block mx-auto mt-4 text-center bg-[#db5422] hover:bg-[#c64619] cursor-pointer text-white py-3 rounded-xl text-lg font-medium transition"
          >
            {loading ? "Registering..." : "Sign Up"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Registration;




// import React, { useState } from 'react';
// import EvaluatorLogo from "../WelCome/Assets/WelcomeLogo.png";
// import { motion } from 'framer-motion';
// import { Link } from 'react-router-dom';

// const Registration = () => {
//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         password: "",
//         // confirmPassword: "",
//         qualification: "",
//         experience: ""
//     });

//     const handleChange = (e) => {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log("Evaluator form submitted:", form);

//     };



//     return (
//         <div className="w-full h-screen flex flex-col lg:flex-row ">
//             {/* Left Side */}
           
//                 <div className="w-full lg:w-1/2 h-1/3 lg:h-full bg-[#db5422] hidden md:flex items-center justify-center p-8">
//                     <motion.img
//                         animate={{ y: [0, -20, 0] }}
//                         transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//                         src={EvaluatorLogo}
//                         alt="EvaluatorLogo"
//                         className="max-h-full object-contain"
//                     />
//                 </div>
           

//             {/* Right Side with animation */}
//             <motion.div
//                 initial={{ x: 100, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ duration: 1, ease: "easeOut" }}
//                 className="w-full lg:w-1/2 h-screen overflow-y-auto flex flex-col items-center text-center  justify-center px-5 md:px-3 py-10"
//             >
//                 <motion.h1
//                     initial={{ y: -30, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ duration: 0.8 }}
//                     className="text-2xl md:text-4xl font-bold text-gray-800 mb-8"
//                 >
//                     Sign Up
//                 </motion.h1>

//                 <form onSubmit={handleSubmit} className="w-full md:px-8 text-left space-y-4">
//                     <input
//                         type="text"
//                         name="name"
//                         placeholder="Name"
//                         value={form.name}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 border rounded-xl border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
//                     />
//                     <input
//                         type="email"
//                         name="email"
//                         placeholder="Email"
//                         value={form.email}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 border rounded-xl border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
//                     />
//                     <input
//                         type="password"
//                         name="password"
//                         placeholder="Password"
//                         value={form.password}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 border rounded-xl border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
//                     />
//                     {/* <input
//                         type="password"
//                         name="confirmPassword"
//                         placeholder="Confirm Password"
//                         value={form.confirmPassword}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 border rounded-xl border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
//                     /> */}
//                     {/* <input
//                         type="text"
//                         name="qualification"
//                         placeholder="Qualification"
//                         value={form.qualification}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 border rounded-xl border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
//                     /> */}
//                     {/* <textarea
//                         name="experience"
//                         placeholder="Experience"
//                         rows={4}
//                         value={form.experience}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 border rounded-xl border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
//                     /> */}

//                     <Link to="/Page"
//                         type="submit"
//                         className="w-3/4 block mx-auto mt-4 text-center bg-[#db5422] hover:bg-[#c64619] cursor-pointer text-white py-3 rounded-xl text-lg font-medium transition"
//                     >
//                         Sign Up
//                     </Link>
//                 </form>

//             </motion.div>
//         </div>
//     );
// };

// export default Registration;
