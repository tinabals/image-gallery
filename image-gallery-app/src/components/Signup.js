import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase-config';
import { createUserWithEmailAndPassword } from 'firebase/auth';

export default function Signup() {
    const [signupData, setSignupData] = useState({ email: '', password: '', confirmPassword: '' });
    const [signupError, setSignupError] = useState(null);
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [loading, setLoading] = useState(false); // Added loading state
    const navigate = useNavigate();

    useEffect(() => {
        // Remove the error message on blur
        const removeErrorOnBlur = () => {
            if (signupError) {
                setSignupError(null);
            }
        };

        window.addEventListener('blur', removeErrorOnBlur);

        return () => {
            window.removeEventListener('blur', removeErrorOnBlur);
        };
    }, [signupError]);

    const handleChange = (e) => {
        setSignupData({ ...signupData, [e.target.name]: e.target.value });
    }

    const handleSignup = async (e) => {
        e.preventDefault();
        const { email, password, confirmPassword } = signupData;

        // Basic email format validation
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!emailRegex.test(email)) {
            setSignupError("Invalid email format. Please enter a valid email address.");
            return;
        }

        // Passwords match validation
        if (password !== confirmPassword) {
            setSignupError("Passwords do not match. Please enter matching passwords.");
            return;
        }

        setLoading(true);

        try {

            await createUserWithEmailAndPassword(auth, email, password);
            setSignupSuccess(true);

            setTimeout(() => {
                setSignupSuccess(false);
                setLoading(false);
                navigate('/');
            }, 3000);
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                setSignupError("Email already exists. Please use a different email.");
            } else {
                setSignupError(error.message);
            }
            setLoading(false); // Set loading state to false on error
        }
    }

    return (
        <div className="mt-8">
            <form onSubmit={handleSignup}>
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        value={signupData.email}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        value={signupData.password}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="confirmPassword" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        value={signupData.confirmPassword}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-6 text-red-500">{signupError}</div>
                {signupSuccess && (
                    <div className="mb-6 text-green-500">Signup successful. You can now login.</div>
                )}
                <button
                    type="submit"
                    className="bg-purple-600 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:ring focus:border-purple-700 hover:bg-purple-700"
                    disabled={loading} // Disable the button when loading
                >
                    {loading ? 'Signing Up...' : 'Sign up'}
                </button>
                <p className="mt-4 text-gray-600">
                    Already have an account? <Link to="/login" className="text-purple-600">Login</Link>
                </p>
            </form>
        </div>
    );
}
