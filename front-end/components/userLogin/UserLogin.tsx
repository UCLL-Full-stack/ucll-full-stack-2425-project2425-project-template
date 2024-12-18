import userService from '@services/userService';
import { useRouter } from 'next/router';
import { useState } from 'react';

const UserLogin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [emailNameError, setEmailNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [statusMessages, setStatusMessages] = useState({ message: '', type: '' });

    const router = useRouter();

    const validate = (): boolean => {
        let result = true;

        if (!email || email.trim() === '') {
            setEmailNameError('Email is required');
            result = false;
        } else {
            setEmailNameError('');
        }

        if (!password || password.trim() === '') {
            setPasswordError('Password is required');
            result = false;
        } else {
            setPasswordError('');
        }
        return result;
    };

    const clearErrors = () => {
        setEmailNameError('');
        setPasswordError('');
        setStatusMessages({ message: '', type: '' });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        clearErrors();
        if (!validate()) {
            return;
        }

        const response = await userService.authenticateUser({ email, password });

        if (response.status === 200) {
            setStatusMessages({ message: 'Login successful', type: 'success' });
            const userByEmailResponse = await userService.getUserByEmail(email);
            const userByEmail = await userByEmailResponse.json();
            const user = await response.json();

            localStorage.setItem(
                'loggedInUser',
                JSON.stringify({
                    name: userByEmail.name,
                    email: user.email,
                    role: user.role,
                })
            );
            setStatusMessages({
                message: 'Login successful. Redirecting to homepage...',
                type: 'success',
            });

            setTimeout(() => {
                router.push('/');
            }, 2000);
        } else {
            setStatusMessages({ message: 'E-mail or password is incorrect', type: 'error' });
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {statusMessages.message && (
                <div
                    className={`${
                        statusMessages.type === 'error' ? 'bg-red-500' : 'bg-green-500'
                    } text-white p-2 text-center mb-4 rounded w-3/4`}
                >
                    {statusMessages.message}
                </div>
            )}

            <h1 className="text-2xl font-bold mb-6">User Login</h1>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center bg-white p-6 rounded shadow-md w-full max-w-sm"
            >
                <div className="w-full mb-4">
                    <label htmlFor="emailInput" className="block text-sm font-medium text-gray-700">
                        E-mail:
                    </label>
                    {emailNameError && (
                        <div className="text-red-500 text-sm mt-1">{emailNameError}</div>
                    )}
                    <input
                        id="emailInput"
                        type="text"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
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
                    <div className="flex items-center mt-1">
                        <input
                            id="passwordInput"
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword((prev) => !prev)}
                            className="ml-2 px-3 py-2 bg-gray-200 text-gray-600 text-sm font-medium rounded hover:bg-gray-300"
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-medium py-2 rounded mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default UserLogin;
