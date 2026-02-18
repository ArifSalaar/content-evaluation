import React, { useState } from 'react';
import { Link as ScrollLink } from "react-scroll";
import { Menu, X, Calendar, Award, Target, Users, Mail, Phone, ChevronRight, Trophy, Lightbulb, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

// ==================== HEADER COMPONENT ====================
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { id: "home", label: "Home" },
        { id: "about", label: "About" },
        // { id: "submissions", label: "Submissions" },
        { id: "dates", label: "Dates" },
        { id: "contact", label: "Contact" },

        // { id: "logout", label: "logout" },

    ];



    const handleLogout = async () => {
        const token = localStorage.getItem("token");
      
        if (token) {
          await fetch("http://localhost:5000/api/logout", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
        }
      
        localStorage.removeItem("token");
        window.location.href = "http://localhost:5173/"; // redirect to home
      };
      


    return (
        <header className="fixed top-0 w-full bg-white/10 backdrop-blur-lg z-50 border-b border-white/20 shadow-lg">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="text-2xl sm:text-3xl font-bold text-white drop-shadow-lg hover:scale-105 transition-transform cursor-pointer">
                        Automated Content Submission Evaluation System
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">






                        {navLinks.map((link) => (
                            <ScrollLink
                                key={link.id}
                                to={link.id}
                                smooth={true}
                                duration={500}
                                offset={-80}
                                spy={true}
                                className="text-white font-medium hover:text-gray-200 transition-all relative group cursor-pointer"
                            >
                                {link.label}
                                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
                            </ScrollLink>
                        ))}




                        {/* <Link
                            to="/evaluator-submissions"
                            className="px-5 py-2.5  border-white  text-white font-semibold  transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl"
                        >
                         Submissions
                        </Link> */}


                        <button
                            onClick={handleLogout}
                            className="text-white font-medium hover:text-gray-200 transition-all py-2 border-b border-white/20 cursor-pointer"
                        >
                            Logout
                        </button>

                        <Link
                            to="/welcome"
                            className="px-6 py-2.5 bg-white/20 border-2 border-white rounded-full text-white font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-xl"
                        >
                            Evaluator / Profile
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden text-white hover:text-gray-200 transition-colors"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <nav className="lg:hidden mt-6 flex flex-col gap-4 pb-4 animate-slideDown bg-white/10 rounded-xl backdrop-blur-lg border border-white/20 p-4">
                        {navLinks.map((link) => (
                            <ScrollLink
                                key={link.id}
                                to={link.id}
                                smooth={true}
                                duration={500}
                                offset={-80}
                                spy={true}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-white hover:text-gray-200 transition-all py-2 border-b border-white/20 cursor-pointer"
                            >
                                {link.label}
                            </ScrollLink>
                        ))}

                        <Link
                            to="/welcome"
                            onClick={() => setIsMenuOpen(false)}
                            className="px-6 py-3 bg-white/20 border-2 border-white rounded-full text-white font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300 mt-2 text-center"
                        >
                            Login / Register
                        </Link>
                    </nav>
                )}
            </div>
        </header>
    );
};

// ==================== HERO SECTION COMPONENT ====================
const HeroSection = () => {
    return (
        <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4 pt-24 pb-20">
            {/* Animated Background Blobs */}
            <div className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-purple-400/20 rounded-full blur-3xl animate-blob top-0 -left-20"></div>
            <div className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-pink-400/20 rounded-full blur-3xl animate-blob animation-delay-2000 top-20 right-0"></div>
            <div className="absolute w-64 h-64 sm:w-96 sm:h-96 bg-blue-400/20 rounded-full blur-3xl animate-blob animation-delay-4000 bottom-0 left-1/2"></div>

            {/* Content */}
            <div className="text-center z-10 max-w-5xl mx-auto">
                <div className="mb-6 animate-fadeInUp">
                    <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-semibold border border-white/30">
                        🏆 Registration Now Open
                    </span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight animate-fadeInUp animation-delay-200">
                    Innovation Challenge
                    <span className="block mt-2">
                        2025
                    </span>
                </h1>

                <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-10 max-w-3xl mx-auto leading-relaxed animate-fadeInUp animation-delay-400">
                    Shape the Future with Your Ideas. Join thousands of innovators competing for recognition, prizes, and the chance to make a real impact.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fadeInUp animation-delay-600">


                    <Link
                        to="/welcome"
                        className="group px-8 py-4 bg-white text-purple-600 rounded-full text-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-2 w-full sm:w-auto justify-center"
                    >
                        Register Team
                        <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
                    </Link>


                    {/* <button className="group px-8 py-4 bg-white text-purple-600 rounded-full text-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-2 w-full sm:w-auto justify-center">
                        Register Team
                        <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
                    </button> */}




                    <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white text-white rounded-full text-lg font-bold hover:bg-white/20 transition-all duration-300 w-full sm:w-auto">
                        Learn More
                    </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-16 max-w-3xl mx-auto animate-fadeInUp animation-delay-800">
                    <div className="text-center">
                        <div className="text-3xl sm:text-5xl font-bold text-white mb-2">5000+</div>
                        <div className="text-white/80 text-sm sm:text-base">Participants</div>
                    </div>
                    <div className="text-center border-x border-white/30">
                        <div className="text-3xl sm:text-5xl font-bold text-white mb-2">$50K</div>
                        <div className="text-white/80 text-sm sm:text-base">Prize Pool</div>
                    </div>
                    <div className="text-center">
                        <div className="text-3xl sm:text-5xl font-bold text-white mb-2">5</div>
                        <div className="text-white/80 text-sm sm:text-base">Categories</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

// ==================== FOOTER COMPONENT ====================
const Footer = () => {
    return (
        <footer className="bg-black/30 backdrop-blur-lg border-t border-white/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">
                    {/* About Column */}
                    <div className="space-y-4">
                        <h3 className="text-2xl font-bold text-white mb-4">InnovaChallenge</h3>
                        <p className="text-white/80 leading-relaxed">
                            Empowering innovation and creativity worldwide. Join us in shaping the future through groundbreaking ideas.
                        </p>
                        <div className="flex gap-4 pt-4">
                            <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110">
                                <span className="text-white">𝕏</span>
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110">
                                <span className="text-white">in</span>
                            </a>
                            <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all hover:scale-110">
                                <span className="text-white">f</span>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xl font-semibold text-white mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            <li>
                                <a href="#home" className="text-white/80 hover:text-white transition-all flex items-center gap-2 group">
                                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    Home
                                </a>
                            </li>
                            <li>
                                <a href="#about" className="text-white/80 hover:text-white transition-all flex items-center gap-2 group">
                                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#rules" className="text-white/80 hover:text-white transition-all flex items-center gap-2 group">
                                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    Rules & Guidelines
                                </a>
                            </li>
                            <li>
                                <a href="#dates" className="text-white/80 hover:text-white transition-all flex items-center gap-2 group">
                                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    Important Dates
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Categories */}
                    <div>
                        <h4 className="text-xl font-semibold text-white mb-6">Categories</h4>
                        <ul className="space-y-3">
                            <li className="text-white/80">Technology</li>
                            <li className="text-white/80">Healthcare</li>
                            <li className="text-white/80">Sustainability</li>
                            <li className="text-white/80">Education</li>
                            <li className="text-white/80">Social Impact</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-xl font-semibold text-white mb-6">Contact Us</h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-white/80 hover:text-white transition-colors group">
                                <Mail size={20} className="flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                                <a href="mailto:info@innovachallenge.com">info@innovachallenge.com</a>
                            </li>
                            <li className="flex items-start gap-3 text-white/80 hover:text-white transition-colors group">
                                <Phone size={20} className="flex-shrink-0 mt-1 group-hover:scale-110 transition-transform" />
                                <a href="tel:+15551234567">+1 (555) 123-4567</a>
                            </li>
                        </ul>
                        <button className="mt-6 px-6 py-2.5 bg-white/10 hover:bg-white/20 border border-white/30 rounded-full text-white font-semibold transition-all hover:scale-105">
                            Send Message
                        </button>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/20 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-white/70 text-sm text-center sm:text-left">
                        &copy; 2025 InnovaChallenge. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm">
                        <a href="#" className="text-white/70 hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="text-white/70 hover:text-white transition-colors">Terms of Service</a>
                        <a href="#" className="text-white/70 hover:text-white transition-colors">Cookie Policy</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// ==================== MAIN  COMPONENT ====================
export default function Public() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600">
            <Header />
            <HeroSection />

            {/* About Section */}
            <section id="about" className="py-16 sm:py-20 lg:py-24 px-4 bg-white/5 backdrop-blur-sm">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                            About the Competition
                        </h2>
                        <div className="w-24 h-1 bg-white mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/20 hover:bg-white/15 hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl group">
                            <div className="text-white mb-4 group-hover:scale-110 transition-transform">
                                <Target size={48} />
                            </div>
                            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">Mission</h3>
                            <p className="text-white/90 leading-relaxed">
                                We bring together the brightest minds to solve real-world challenges through innovation, creativity, and technology. This competition is your platform to showcase groundbreaking ideas.
                            </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/20 hover:bg-white/15 hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl group">
                            <div className="text-white mb-4 group-hover:scale-110 transition-transform">
                                <Lightbulb size={48} />
                            </div>
                            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">Categories</h3>
                            <p className="text-white/90 leading-relaxed">
                                Compete in multiple categories including Technology, Healthcare, Sustainability, Education, and Social Impact. Choose your passion and make a difference.
                            </p>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/20 hover:bg-white/15 hover:-translate-y-2 transition-all duration-300 hover:shadow-2xl group">
                            <div className="text-white mb-4 group-hover:scale-110 transition-transform">
                                <Trophy size={48} />
                            </div>
                            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-4">Prizes</h3>
                            <p className="text-white/90 leading-relaxed">
                                Win exciting prizes, mentorship opportunities, and funding for your projects. Top winners receive cash prizes, incubation support, and industry recognition.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Rules Section */}
            <section id="rules" className="py-16 sm:py-20 lg:py-24 px-4 bg-black/10">
                <div className="container mx-auto max-w-7xl">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                            Rules & Guidelines
                        </h2>
                        <div className="w-24 h-1 bg-white mx-auto"></div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                        <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/20 hover:bg-white/15 hover:-translate-y-2 transition-all duration-300">
                            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-6">Eligibility</h3>
                            <ul className="space-y-3">
                                <li className="text-white/90 flex items-start gap-2">
                                    <CheckCircle size={20} className="flex-shrink-0 mt-0.5 text-green-300" />
                                    <span>Open to individuals and teams worldwide</span>
                                </li>
                                <li className="text-white/90 flex items-start gap-2">
                                    <CheckCircle size={20} className="flex-shrink-0 mt-0.5 text-green-300" />
                                    <span>Team size: 1-5 members</span>
                                </li>
                                <li className="text-white/90 flex items-start gap-2">
                                    <CheckCircle size={20} className="flex-shrink-0 mt-0.5 text-green-300" />
                                    <span>Must be 18+ years old</span>
                                </li>
                                <li className="text-white/90 flex items-start gap-2">
                                    <CheckCircle size={20} className="flex-shrink-0 mt-0.5 text-green-300" />
                                    <span>Students and professionals welcome</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/20 hover:bg-white/15 hover:-translate-y-2 transition-all duration-300">
                            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-6">Submission Requirements</h3>
                            <ul className="space-y-3">
                                <li className="text-white/90 flex items-start gap-2">
                                    <CheckCircle size={20} className="flex-shrink-0 mt-0.5 text-blue-300" />
                                    <span>Original and innovative ideas</span>
                                </li>
                                <li className="text-white/90 flex items-start gap-2">
                                    <CheckCircle size={20} className="flex-shrink-0 mt-0.5 text-blue-300" />
                                    <span>Detailed project proposal</span>
                                </li>
                                <li className="text-white/90 flex items-start gap-2">
                                    <CheckCircle size={20} className="flex-shrink-0 mt-0.5 text-blue-300" />
                                    <span>Prototype or proof of concept</span>
                                </li>
                                <li className="text-white/90 flex items-start gap-2">
                                    <CheckCircle size={20} className="flex-shrink-0 mt-0.5 text-blue-300" />
                                    <span>Video presentation (max 5 min)</span>
                                </li>
                            </ul>
                        </div>

                        <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-white/20 hover:bg-white/15 hover:-translate-y-2 transition-all duration-300">
                            <h3 className="text-xl sm:text-2xl font-semibold text-white mb-6">Evaluation Criteria</h3>
                            <ul className="space-y-3">
                                <li className="text-white/90 flex items-start gap-2">
                                    <CheckCircle size={20} className="flex-shrink-0 mt-0.5 text-yellow-300" />
                                    <span>Innovation & Originality (30%)</span>
                                </li>
                                <li className="text-white/90 flex items-start gap-2">
                                    <CheckCircle size={20} className="flex-shrink-0 mt-0.5 text-yellow-300" />
                                    <span>Feasibility & Impact (30%)</span>
                                </li>
                                <li className="text-white/90 flex items-start gap-2">
                                    <CheckCircle size={20} className="flex-shrink-0 mt-0.5 text-yellow-300" />
                                    <span>Technical Excellence (20%)</span>
                                </li>
                                <li className="text-white/90 flex items-start gap-2">
                                    <CheckCircle size={20} className="flex-shrink-0 mt-0.5 text-yellow-300" />
                                    <span>Presentation Quality (20%)</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Important Dates Section */}
            <section id="dates" className="py-16 sm:py-20 lg:py-24 px-4 bg-white/5">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center mb-12 sm:mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                            Important Dates
                        </h2>
                        <div className="w-24 h-1 bg-white mx-auto"></div>
                    </div>

                    <div className="space-y-4">
                        {[
                            { label: "Registration Opens", date: "January 15, 2025" },
                            { label: "Submission Deadline", date: "March 30, 2025" },
                            { label: "Evaluation Period", date: "April 1-20, 2025" },
                            { label: "Results Announcement", date: "May 1, 2025" },
                            { label: "Awards Ceremony", date: "May 15, 2025" }
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-xl border-l-4 border-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 hover:bg-white/15 hover:translate-x-2 transition-all duration-300 group"
                            >
                                <div className="flex items-center gap-3">
                                    <Calendar className="text-white group-hover:scale-110 transition-transform flex-shrink-0" size={24} />
                                    <span className="text-lg sm:text-xl font-semibold text-white">{item.label}</span>
                                </div>
                                <span className="text-base sm:text-lg text-white/90 sm:ml-auto">{item.date}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-16 sm:py-20 lg:py-24 px-4 bg-black/10">
                <div className="container mx-auto max-w-4xl text-center">
                    <div className="mb-8 sm:mb-12">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                            Get in Touch
                        </h2>
                        <div className="w-24 h-1 bg-white mx-auto mb-6"></div>
                        <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
                            Have questions? We're here to help! Reach out to us anytime.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-12 mb-10">
                        <a href="mailto:info@innovachallenge.com" className="flex items-center gap-3 text-white hover:text-gray-200 transition-all group">
                            <div className="p-3 bg-white/10 rounded-full group-hover:bg-white/20 transition-all">
                                <Mail size={24} />
                            </div>
                            <span className="text-base sm:text-lg">info@innovachallenge.com</span>
                        </a>
                        <a href="tel:+15551234567" className="flex items-center gap-3 text-white hover:text-gray-200 transition-all group">
                            <div className="p-3 bg-white/10 rounded-full group-hover:bg-white/20 transition-all">
                                <Phone size={24} />
                            </div>
                            <span className="text-base sm:text-lg">+1 (555) 123-4567</span>
                        </a>
                    </div>

                    <button className="px-8 py-3 bg-white/20 border-2 border-white rounded-full text-white font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
                        Send Message
                    </button>
                </div>
            </section>

            <Footer />

            <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          25% {
            transform: translate(20px, -50px) scale(1.1);
          }
          50% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          75% {
            transform: translate(50px, 50px) scale(1.05);
          }
        }
        
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-slideDown {
          animation: slideDown 0.3s ease-out;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        .animation-delay-800 {
          animation-delay: 0.8s;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
        </div>
    );
}