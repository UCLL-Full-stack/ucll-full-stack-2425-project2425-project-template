import userService from '@services/userService';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const SettingsForm: React.FC = () => {
    const [currentName, setCurrentName] = useState('');
    const [currentEmail, setCurrentEmail] = useState('');
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [statusMessages, setStatusMessages] = useState({ message: '', type: '' });
    const router = useRouter();

    useEffect(() => {
        const userEmail = localStorage.getItem('loggedInUser')
            ? JSON.parse(localStorage.getItem('loggedInUser')!).email
            : null;
        if (userEmail) {
            userService.getUserByEmail(userEmail).then(async (response) => {
                const currentUser = await response.json();
                setCurrentName(currentUser.name);
                setCurrentEmail(currentUser.email);
            });
        } else {
            router.push('/login');
        }
    }, []);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // if (!newName && !newEmail) {
        //     setStatusMessages({ message: 'No changes made.', type: 'error' });
        //     return;
        // }
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

            <h1 className="text-2xl font-bold mb-6">Account Settings</h1>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center bg-white p-6 rounded shadow-md w-full max-w-sm"
            >
                <div className="w-full mb-4">
                    <label className="block text-sm font-medium text-gray-700">Current Name:</label>
                    <div className="border border-gray-300 rounded px-3 py-2 mt-1 w-full bg-gray-100">
                        {currentName}
                    </div>
                </div>

                <div className="w-full mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                        Current Email:
                    </label>
                    <div className="border border-gray-300 rounded px-3 py-2 mt-1 w-full bg-gray-100">
                        {currentEmail}
                    </div>
                </div>

                <div className="w-full mb-4">
                    <label
                        htmlFor="NewNameInput"
                        className="block text-sm font-medium text-gray-700"
                    >
                        New Name:
                    </label>
                    <input
                        id="NewNameInput"
                        type="text"
                        value={newName}
                        onChange={(event) => setNewName(event.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div className="w-full mb-4">
                    <label
                        htmlFor="NewEmailInput"
                        className="block text-sm font-medium text-gray-700"
                    >
                        New Email:
                    </label>
                    <input
                        id="NewEmailInput"
                        type="text"
                        value={newEmail}
                        onChange={(event) => setNewEmail(event.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-medium py-2 rounded mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default SettingsForm;
