import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar'; // Adjust path if needed

function Home() {
    const navigate = useNavigate();
    const username = localStorage.getItem('username') || 'Guest';

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/signin');
    };

    return (
        <div
            className="flex min-h-screen bg-[#F2F2F2] font-[Inter,sans-serif] text-purple-900"
            style={{ fontFamily: 'Inter, sans-serif' }}
        >
            {/* Sidebar Section */}
            <div className="p-4 hidden md:block">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center p-6">
                <div className="bg-white/30 backdrop-blur-xl border border-white/40 shadow-[0_10px_40px_rgba(0,0,0,0.25)] p-10 rounded-2xl w-full max-w-md text-center transition-all">
                    <h1 className="text-4xl font-extrabold text-purple-800 mb-4">Welcome Back</h1>
                    <p className="text-lg font-medium mb-6">Hello, <span className="font-semibold">{username}</span> 👋</p>
                    
                    <button
                        onClick={handleLogout}
                        className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-3 px-6 rounded-xl shadow-lg hover:shadow-purple-800/40 transition duration-300 font-semibold tracking-wide"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;
