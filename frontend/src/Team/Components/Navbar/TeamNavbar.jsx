import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logo from './Assets/logo.png';
import chatIcon from './Assets/chat.png';
import ActiveChatIcon from './Assets/ActiveChatIcon.png';
import { Menu, X } from 'lucide-react';

const TeamNavbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [isChatActive, setIsChatActive] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        
        setIsChatActive(location.pathname === '/TeamChat');
    }, [location.pathname]);

    const handleChatClick = (e) => {
        e.preventDefault();
        navigate('/TeamChat');
        setIsChatActive(true);
        setIsMenuOpen(false);
    };

    const handleNavClick = () => {
        setIsChatActive(false); // deactivate chat icon
        setIsMenuOpen(false);   // close mobile menu
    };

    const activeLink = (path) =>
        location.pathname === path
            ? 'text-[#db5422] border-b-2 border-[#db5422] font-semibold'
            : 'text-gray-700 hover:text-[#db5422] hover:border-b-2 hover:border-[#db5422] transition';

    return (
        <div className="w-full fixed top-0 left-0 right-0 z-50 bg-[#fdfbf9] shadow-sm">
            {/* Navbar */}
            <div className="h-[75px] flex justify-between items-center px-4 md:px-6">
                {/* Logo */}
                <div className="flex mt-4 items-center">
                    <img src={logo} alt="Team" className="w-28 sm:w-32" />
                </div>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center gap-10">
                    <Link to="/Teamdashboard" className={`${activeLink('/Teamdashboard')} pb-1`} onClick={handleNavClick}>
                        Dashboard
                    </Link>
                    <Link to="/TeamSubmissions" className={`${activeLink('/TeamSubmissions')} pb-1`} onClick={handleNavClick}>
                        Submissions
                    </Link>
                    {/* <Link to="/TeamLeaderboard" className={`${activeLink('/TeamLeaderboard')} pb-1`} onClick={handleNavClick}>
                        Leaderboard
                    </Link> */}
                </div>

                {/* Right: Chat & Hamburger */}
                <div className="flex items-center gap-4">
                    {/* Chat Icon (Desktop Only) */}
                    <div
                        onClick={handleChatClick}
                        className={`p-2 rounded-full cursor-pointer border transition duration-200 hidden md:block ${isChatActive ? "bg-orange-500 border-[#E6E6E6]" : "bg-[#F5F5F5] border-[#E6E6E6]"
                            }`}
                    >
                        {/* <img
                            src={isChatActive ? ActiveChatIcon : chatIcon}
                            alt="Chat"
                            className="h-7"
                        /> */}
                    </div>

                    {/* Hamburger Icon (Mobile) */}
                    <div className="md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMenuOpen && (
                <div className="md:hidden bg-[#fdfbf9] px-4 py-4 flex flex-col items-center gap-3 text-sm border-t">
                    <Link to="/Teamdashboard" className={`w-fit ${activeLink('/Teamdashboard')} pb-1`} onClick={handleNavClick}>
                        Dashboard
                    </Link>
                    <Link to="/TeamSubmissions" className={`w-fit ${activeLink('/TeamSubmissions')} pb-1`} onClick={handleNavClick}>
                        Submissions
                    </Link>
                    <Link to="/TeamLeaderboard" className={`w-fit ${activeLink('/TeamLeaderboard')} pb-1`} onClick={handleNavClick}>
                        Leaderboard
                    </Link>
                    <Link to="/TeamChat" className={`w-fit ${activeLink('/TeamChat')} pb-1`} onClick={handleChatClick}>
                        Chat
                    </Link>
                </div>
            )}
        </div>
    );
};

export default TeamNavbar;
