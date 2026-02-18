import React, { useEffect, useState } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { RiMenu3Line } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";
import { FaVideo, FaComments, FaTrophy, FaUsers } from "react-icons/fa";
import { MdFeedback } from "react-icons/md";
import { AiOutlineHome } from "react-icons/ai";
import sidebarlogo from "./Assets/logo.png";
import arrowImg from "./Assets/arrowImg.png";
import logOutImg from "./Assets/LogoutImg.png";
import LogoutModal from "./LogoutModal/LogoutModal";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLogOut, setIsLogOut] = useState(false);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [activePath, setActivePath] = useState(location.pathname);
  const [hoveredPath, setHoveredPath] = useState(null);
  const [pageHeading, setPageHeading] = useState("Dashboard");

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const closeSidebar = () => setIsSidebarOpen(false);

  const sections = [
    {
      heading: "",
      items: [
        { path: "/Dashboard", label: "Dashboard", icon: <AiOutlineHome size={22} /> },
        { path: "/Evaluators", label: "Evaluators", icon:<FaUsers size={22} /> },
        { path: "/Submissions", label: "Submissions", icon: <FaVideo size={22} /> },
        { path: "/Assignments", label: "Assignments", icon: <MdFeedback size={22} />  },
        { path: "/Teams", label: "Teams", icon:<FaUsers size={22} />  },
        


        
       
      ],
    },
  ];

  // 🔹 Page Headings
  const pageConfigs = {
    "/Dashboard": { heading: "Dashboard" },
    "/Evaluators": { heading: "Evaluators" },
    "/Submissions": { heading: "Submissions" }, 
    "/Assignments": { heading: "Assignments" },
    "/Teams": { heading: "Teams" },



    "/AllUsers": { heading: "Users" },
    // "/SubmitScore": { heading: "Dashboard " },
    // "/Feedback": { heading: "Feedback" },
    // "/Leaderboard": { heading: "Leaderboard" },

   

  };

  useEffect(() => {
    const currentPath = location.pathname;
    const config = pageConfigs[currentPath] || { heading: "Dashboard" };
    setPageHeading(config.heading);
    setActivePath(currentPath);
  }, [location]);


  const backEnabledPaths = [
    "/UsersDetail",
    "/Detail",
    "/UsersJobRequestedDetail",
  ];
  const isBackButtonAllowed = backEnabledPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* 🔹 Topbar */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="lg:ml-[280px] bg-white ml-auto flex justify-between items-center p-6 shadow-sm border-b-2 border-[#e4e4e4]"
      >
        <div className="flex items-center gap-x-2">
          {isBackButtonAllowed ? (
            <img
              src={arrowImg}
              className="w-[40px] cursor-pointer"
              onClick={() => navigate(-1)}
              title="Go Back"
            />
          ) : (
            <img
              src={arrowImg}
              className="w-[40px] hidden"
              title="Back not available on this page"
            />
          )}
          <h1 className="md:text-[25px] text-[20px] font-bold">
            {pageHeading}
          </h1>
        </div>

        <button
          onClick={toggleSidebar}
          className="lg:hidden rounded-sm bg-[#000000] p-2 shadow-md text-white"
        >
          <RiMenu3Line size={20} />
        </button>
      </motion.div>

      {/* 🔹 Sidebar */}
      <AnimatePresence>
        {(isSidebarOpen || screenWidth >= 1024) && (
          <motion.div
            initial={{ x: -250 }}
            animate={{ x: 0 }}
            exit={{ x: -250 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 justify-between bg-orange-600 py-10 text-white w-[280px] h-full z-30 flex flex-col overflow-y-auto"
          >
            <style>{`::-webkit-scrollbar { display: none; }`}</style>
            <div>
              {/* Logo */}
              <div className="flex-shrink-0 mb-8 flex justify-center">
                <motion.img
                  src={sidebarlogo}
                  alt="Logo"
                  className="w-[150px]"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                />
              </div>

              {/* Links */}
              <div className="flex flex-col space-y-6 px-3">
                {sections.map((section, sectionIndex) => (
                  <div key={sectionIndex}>
                    {/* Section Heading */}
                    <p className="text-gray-400 text-sm font-medium mb-2 ps-2 uppercase">
                      {section.heading}
                    </p>

                    {/* Section Items */}
                    <div className="flex flex-col space-y-2">
                      {section.items.map((link, linkIndex) => {
                        const isActive =
                          activePath === link.path ||
                          (link.path1 && activePath === link.path1);
                        link.path1 && activePath.startsWith(link.path1);

                        const isHover = hoveredPath === link.path;
                        const isHighlighted = isActive || isHover;

                        return (
                          <Link
                            key={linkIndex}
                            to={link.path}
                            onMouseEnter={() => setHoveredPath(link.path)}
                            onMouseLeave={() => setHoveredPath(null)}
                            onClick={closeSidebar}
                            className="flex px-0"
                          >
                            <div>
                              <div
                                className={`w-[5px] absolute  left-0 h-12 ${isHighlighted
                                  ? "bg-white rounded-r-2xl"
                                  : "bg-transparent"
                                  }`}
                              ></div>
                            </div>
                            <motion.div
                              className={`w-[95%] py-3 ms-2 flex items-center ps-4 rounded-sm transition-all duration-300 ${isHighlighted
                                ? "bg-white text-[#000000]"
                                : "bg-transparent"
                                }`}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <div className="text-[22px]">{link.icon}</div>

                              <span className="ms-2 text-[17px]">
                                {link.label}
                              </span>
                            </motion.div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Logout bottom fixed */}
            <div className="mt-20 px-4">
              <div
                className="flex cursor-pointer items-center gap-2 p-3 w-[245px] rounded-lg"
                onClick={() => setIsLogOut(true)}
              >
                <img
                  src={logOutImg}
                  className="w-[25px] h-[25px]"
                  alt="Logout"
                />
                <button className="ms-2 text-[17px] cursor-pointer">
                  LogOut
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 🔹 Backdrop (Mobile) */}
      <AnimatePresence>
        {isSidebarOpen && screenWidth < 1024 && (
          <motion.div
            onClick={closeSidebar}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/75 lg:hidden z-20"
          />
        )}
      </AnimatePresence>

      {/* 🔹 Logout Modal */}
      <LogoutModal
        openLogoutModal={isLogOut}
        closeLogoutModal={() => setIsLogOut(false)}
      />
    </>
  );
};

export default AdminSidebar;
