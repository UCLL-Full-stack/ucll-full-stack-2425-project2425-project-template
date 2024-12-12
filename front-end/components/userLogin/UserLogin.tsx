import userService from '@services/userService';
import userSerivce from '@services/userService';
import { useRouter } from 'next/router';
import { useState } from 'react';

const UserLogin: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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

        localStorage.setItem('loggedInUser', email);
        const response = await userService.authenticateUser({ email, password });

        if (response.status === 200) {
            setStatusMessages({ message: 'Login successful', type: 'success' });
            const user = await response.json();

            localStorage.setItem(
                'loggedInUser',
                JSON.stringify({
                    token: user.token,
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
        <div className="flex flex-col items-center justify-center ">
            {statusMessages.message && (
                <div
                    className={`${
                        statusMessages.type === 'error' ? 'bg-red-500' : 'bg-green-500'
                    } text-white p-2 text-center`}
                >
                    {statusMessages.message}
                </div>
            )}
            {emailNameError && <div className="text-red-500">{emailNameError}</div>}
            {passwordError && <div className="text-red-500">{passwordError}</div>}
            <h1>User Login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center">
                <div className="flex flex-col items-start">
                    <label htmlFor="emailInput" className="mb-2">
                        e-mail:
                    </label>
                    <input
                        id="emailInput"
                        type="text"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        className="border-2"
                    />
                </div>

                <div className="flex flex-col items-start mt-4">
                    <label htmlFor="passwordInput" className="mb-2">
                        password:
                    </label>
                    <input
                        id="passwordInput"
                        type="text"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        className="border-2"
                    />
                </div>
                <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                    Login
                </button>
            </form>
        </div>
    );
};

export default UserLogin;
