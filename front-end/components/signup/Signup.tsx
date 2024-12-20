import { useState } from 'react';
import { useRouter } from 'next/router';
import userService from '@services/userService';

const Signup: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [birthday, setBirthday] = useState('');

    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [statusMessages, setStatusMessages] = useState({ message: '', type: '' });

    const router = useRouter();

    const validate = (): boolean => {
        let isValid = true;

        if (!name.trim()) {
            setNameError('Name is required');
            isValid = false;
        } else {
            setNameError('');
        }

        if (!email.trim()) {
            setEmailError('Email is required');
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError('Invalid email format');
            isValid = false;
        } else {
            setEmailError('');
        }

        if (!password.trim()) {
            setPasswordError('Password is required');
            isValid = false;
        } else if (password.length < 8) {
            setPasswordError('Password must be at least 8 characters long');
            isValid = false;
        } else if (!/\d/.test(password)) {
            setPasswordError('Password must contain at least one number');
            isValid = false;
        } else {
            setPasswordError('');
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            isValid = false;
        } else {
            setConfirmPasswordError('');
        }

        if (!birthday.trim()) {
            setStatusMessages({ message: 'Birthday is required', type: 'error' });
            isValid = false;
        } else {
            setStatusMessages({ message: '', type: '' });
        }

        return isValid;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        const response = await userService.userSignup({
            name,
            email,
            password,
            birthday: new Date(birthday),
        });

        if (response.status === 200) {
            setStatusMessages({
                message: 'Signup successful! Redirecting to login...',
                type: 'success',
            });
            setTimeout(() => {
                router.push('/login');
            }, 2000);
        } else {
            setStatusMessages({ message: 'Signup failed. Please try again.', type: 'error' });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center mt-20">
            {statusMessages.message && (
                <div
                    className={`${
                        statusMessages.type === 'error' ? 'bg-red-500' : 'bg-green-500'
                    } text-white p-2 text-center mb-4 rounded w-3/4`}
                >
                    {statusMessages.message}
                </div>
            )}

            <h1 className="text-2xl font-bold mb-6">Signup</h1>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center bg-white p-6 rounded shadow-md w-full max-w-sm"
            >
                <div className="w-full mb-4">
                    <label htmlFor="nameInput" className="block text-sm font-medium text-gray-700">
                        Name:
                    </label>
                    {nameError && <div className="text-red-500 text-sm mt-1">{nameError}</div>}
                    <input
                        id="nameInput"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="w-full mb-4">
                    <label htmlFor="emailInput" className="block text-sm font-medium text-gray-700">
                        Email:
                    </label>
                    {emailError && <div className="text-red-500 text-sm mt-1">{emailError}</div>}
                    <input
                        id="emailInput"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="w-full mb-4">
                    <label
                        htmlFor="passwordInput"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Password:
                    </label>
                    {passwordError && (
                        <div className="text-red-500 text-sm mt-1">{passwordError}</div>
                    )}
                    <input
                        id="passwordInput"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="w-full mb-4">
                    <label
                        htmlFor="confirmPasswordInput"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Confirm Password:
                    </label>
                    {confirmPasswordError && (
                        <div className="text-red-500 text-sm mt-1">{confirmPasswordError}</div>
                    )}
                    <input
                        id="confirmPasswordInput"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="w-full mb-4">
                    <label
                        htmlFor="birthdayInput"
                        className="block text-sm font-medium text-gray-700"
                    >
                        Birthday:
                    </label>
                    <input
                        id="birthdayInput"
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-medium py-2 rounded mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Signup
                </button>
                <a href="/login" className="mt-3">
                    Already have an account? Login here
                </a>
            </form>
        </div>
    );
};

export default Signup;
