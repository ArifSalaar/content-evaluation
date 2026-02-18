import React, { useState } from 'react';
import EvaluatorLogo from "../WelCome/Assets/WelcomeLogo.png";
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import API from "../../api/api.js"; // ✅ import axios instance

const EvaluatorRegistration = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    address: "",
    phone: "",
    qualification: "",
    experience: ""
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
      // ✅ send form data to backend
      const res = await API.post("/evaluator/profile", form);

      console.log("Evaluator registration success:", res.data);
      alert("✅ Evaluator registered successfully!");

      navigate("/Page"); // redirect or change route after success
    } catch (err) {
      console.error("Evaluator registration error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

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
        className="w-full lg:w-1/2 h-screen overflow-y-auto flex flex-col items-center text-center justify-center md:justify-start lg:justify-center px-5 md:px-3 py-10"
      >
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-2xl md:text-4xl font-bold text-gray-800 mb-8"
        >
          Evaluator Registration
        </motion.h1>

        <form onSubmit={handleSubmit} className="w-full md:px-8 text-left space-y-4">
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={form.address}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
          />

          <input
            type="number"
            name="phone"
            placeholder="Phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
          />

          <input
            type="text"
            name="qualification"
            placeholder="Qualification"
            value={form.qualification}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
          />

          <textarea
            name="experience"
            placeholder="Experience"
            rows={4}
            value={form.experience}
            onChange={handleChange}
            className="w-full px-4 py-3 border rounded-xl border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-3/4 block mx-auto mt-4 bg-[#db5422] hover:bg-[#c64619] cursor-pointer text-white py-3 rounded-xl text-lg font-medium transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default EvaluatorRegistration;





// import React, { useState } from 'react';
// import EvaluatorLogo from "../WelCome/Assets/WelcomeLogo.png";
// import { motion } from 'framer-motion';

// const EvaluatorRegistration = () => {
//     const [form, setForm] = useState({
//         address: "",
//         phone: "",
//         // email: "",
//         // password: "",
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
//         // Submission logic here
//     };



//     return (
//         <div className="w-full h-screen flex flex-col lg:flex-row ">
//             {/* Left Side */}
//             <div className="w-full lg:w-1/2 h-1/3 lg:h-full bg-[#db5422] hidden md:flex items-center justify-center p-8">
//                 <motion.img
//                     animate={{ y: [0, -20, 0] }}
//                     transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
//                     src={EvaluatorLogo}
//                     alt="EvaluatorLogo"
//                     className="max-h-full object-contain"
//                 />
//             </div>

//             {/* Right Side with animation */}
//             <motion.div
//                 initial={{ x: 100, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ duration: 1, ease: "easeOut" }}
//                 className="w-full lg:w-1/2 h-screen overflow-y-auto flex flex-col items-center text-center justify-center md:justify-start  lg:justify-center px-5 md:px-3 py-10"
//             >
//                 <motion.h1
//                     initial={{ y: -30, opacity: 0 }}
//                     animate={{ y: 0, opacity: 1 }}
//                     transition={{ duration: 0.8 }}
//                     className="text-2xl md:text-4xl font-bold text-gray-800 mb-8"
//                 >
//                     Evaluator Registration
//                 </motion.h1>

//                 <form onSubmit={handleSubmit} className="w-full md:px-8 text-left space-y-4">
//                     {/* <input
//                         type="text"
//                         name="name"
//                         placeholder="Name"
//                         value={form.name}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 border rounded-xl border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
//                     /> */}
//                     <input
//                         type="text"
//                         name="address"
//                         placeholder="Address"
//                         value={form.address}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 border rounded-xl border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
//                     />
//                      <input
//                         type="number"
//                         name="phone"
//                         placeholder="Phone"
//                         value={form.phone}
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
//                     <input
//                         type="text"
//                         name="qualification"
//                         placeholder="Qualification"
//                         value={form.qualification}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 border rounded-xl border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
//                     />
//                     <textarea
//                         name="experience"
//                         placeholder="Experience"
//                         rows={4}
//                         value={form.experience}
//                         onChange={handleChange}
//                         className="w-full px-4 py-3 border rounded-xl border-gray-300 text-sm focus:outline-none focus:ring-1 focus:ring-orange-500"
//                     />

//                     <button
//                         type="submit"
//                         className="w-3/4 block mx-auto mt-4 bg-[#db5422] hover:bg-[#c64619] cursor-pointer text-white py-3 rounded-xl text-lg font-medium transition"
//                     >
//                         Register
//                     </button>
//                 </form>

//             </motion.div>
//         </div>
//     );
// };

// export default EvaluatorRegistration;
