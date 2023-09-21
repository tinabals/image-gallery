import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [loginError, setLoginError] = useState(null);
    const [loggingIn, setLoggingIn] = useState(false); // State to track if login is in progress

    const navigate = useNavigate();

    const handleChange = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        const { email, password } = loginData;
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(email)) {
            setLoginError("Invalid email format. Please enter a valid email address.");
            return;
        }

        try {
            setLoggingIn(true); // Set loggingIn to true when login starts
            await signInWithEmailAndPassword(auth, email, password);
            // Handle successful login
            setLoginError(null); // Clear any previous login error
            setLoggingIn(false); // Set loggingIn to false when login is successful
            navigate('/imagegallery'); // Use navigate to redirect to the image gallery
        } catch (error) {
            setLoggingIn(false); // Set loggingIn to false on login error
            setLoginError(error.message);
        }
    }

    return (
        <div className="mt-8">
            <form onSubmit={handleLogin}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={loginData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={loginData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-2 text-red-500">{loginError}</div>
                {loggingIn ? (
                    <button
                        type="submit"
                        className="bg-purple-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring focus:border-purple-700 cursor-not-allowed"
                        disabled
                    >
                        Logging In...
                    </button>
                ) : (
                    <button
                        type="submit"
                        className="bg-purple-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring focus:border-purple-700 hover:bg-purple-700"
                    >
                        Login
                    </button>
                )}
                <p className="mt-4 text-gray-600">
                    Don't have an account? <Link to="/signup" className="text-purple-600">Sign up</Link>
                </p>
            </form>
        </div>
    );
}
