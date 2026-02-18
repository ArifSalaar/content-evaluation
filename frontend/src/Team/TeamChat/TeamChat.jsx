import React, { useState, useRef, useEffect } from 'react';
import { FaPaperPlane, FaBars } from 'react-icons/fa';
import chat1 from "./Assets/chat1.png"
import chat2 from "./Assets/chat2.png"
import chat3 from "./Assets/chat3.png"
import chat4 from "./Assets/chat4.jpeg"
import chat5 from "./Assets/chat5.png"

const users = [
    { name: 'Smith', message: "I'm smith", date: '15/04/2025', chatimage: chat1 },
    { name: 'John', message: 'beth', date: '08/04/2025', chatimage: chat2 },
    { name: 'Maxwell', message: 'hy', date: '06/03/2025', chatimage: chat3 },
    { name: 'Fahad', message: 'jhh', date: '03/03/2025', chatimage: chat4 },
    { name: 'Cook', message: 'hshd', date: '01/03/2025', chatimage: chat2 },
    { name: 'Baravo', message: 'hello', date: '28/02/2025', chatimage: chat5 },
];

const messages = [
    { sender: 'them', text: 'hhhh', date: '13/03/2025' },
    { sender: 'them', text: 'thanks', date: '13/03/2025' },
    { sender: 'them', text: 'hello', date: '13/03/2025' },
    { sender: 'me', text: 'good morning', date: '13/03/2025' },
    { sender: 'me', text: 'hi', date: '18/03/2025' },
];

const TeamChat = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);
    const menuButtonRef = useRef(null);

    // Close sidebar on outside click (mobile only)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target) &&
                menuButtonRef.current &&
                !menuButtonRef.current.contains(event.target) &&
                isSidebarOpen &&
                window.innerWidth < 768
            ) {
                setIsSidebarOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isSidebarOpen]);



    return (
        <div className='h-screen pt-[75px] flex relative overflow-hidden'>

            {/* Sidebar */}
            <div
                ref={sidebarRef}
                className={`fixed md:static top-[75px] left-0 z-20 h-[calc(100vh-75px)] w-[300px] bg-white border-r transform transition-transform duration-300 ease-in-out 
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                <div className='p-4'>
                    <input
                        type='text'
                        placeholder='Search for a user..'
                        className='w-full p-2 rounded-full border focus:outline-none'
                    />
                </div>
                <div className='overflow-y-auto h-full'>
                    {users.map((user, index) => (
                        <div
                            key={index}
                            className={`flex items-center px-4 py-3 cursor-pointer hover:bg-gray-100 ${index === 0 ? 'bg-red-100' : ''
                                }`}
                        >
                            <img
                                src={user.chatimage}
                                alt={user.name}
                                className='w-10 h-10 rounded-full object-cover'
                            />
                            <div className='ml-3 flex-1'>
                                <div className='font-semibold'>{user.name}</div>
                                <div className='text-sm text-gray-500 truncate'>{user.message}</div>
                            </div>
                            <div className='text-sm text-gray-400'>{user.date}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Chat area */}
            <div className='flex-1 flex flex-col bg-white overflow-hidden'>

                {/* Chat header */}
                <div className='flex items-center justify-between px-6 py-3 border-b bg-gray-100'>
                    <div className='flex items-center'>
                        <img src={chat1} className='w-10 h-10 rounded-full' alt='avatar' />
                        <span className='ml-3 font-semibold'>Smith</span>
                    </div>
                    {/* Menu button for small screens */}
                    <button
                        ref={menuButtonRef}
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className='block md:hidden cursor-pointer text-gray-700 '
                    >
                        <FaBars size={20} />
                    </button>

                </div>

                {/* Messages */}
                <div className='flex-1 px-6 py-4 overflow-y-auto space-y-4'>
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex flex-col ${msg.sender === 'me' ? 'items-end' : 'items-start'
                                }`}
                        >
                            <div
                                className={`rounded-xl px-4 py-2 text-sm ${msg.sender === 'me'
                                    ? 'bg-gray-100 text-gray-700'
                                    : 'bg-[#f5e8dc] text-gray-700'
                                    }`}
                            >
                                {msg.text}
                            </div>
                            <span className='text-xs text-gray-400 mt-1'>{msg.date}</span>
                        </div>
                    ))}
                </div>

                {/* Input */}
                <div className='p-4 border-t flex items-center gap-2'>
                    <input
                        type='text'
                        placeholder='Type Message...'
                        className='flex-1 p-3 border rounded-full focus:outline-none'
                    />
                    <button className='bg-orange-600 cursor-pointer text-white p-3 rounded-full'>
                        <FaPaperPlane size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TeamChat;
