import { useRouter } from 'next/router';
import React from 'react';

const LoginOverview: React.FC = () => {
    const router = useRouter(); 

    const onLogin = () => {
        router.push('/'); 
    };

    return (
        <div className="flex flex-col">
            <h2 className="text-2xl font-semibold text-center text-gray-700">Login</h2>
            <form className="mt-4">
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600" htmlFor="username">
                        Username or Email
                    </label>
                    <input
                        type="text"
                        id="username"
                        className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter your username or email"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-600" htmlFor="password">
                        Password
                    </label>
                    <input
                        type="password"
                        id="password"
                        className="w-full p-2 mt-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <button
                    type="submit"
                    onClick={onLogin}
                    className="w-full p-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    Login
                </button>
            </form>
            <p className="mt-4 text-sm text-center text-gray-600">
                Don't have an account? <a href="#" className="text-blue-600 hover:underline">Sign up</a>
            </p>
        </div>
    );
};

export default LoginOverview;
