import userService from '@services/userService';
import { useEffect, useState } from 'react';

const SettingsForm: React.FC = () => {
    const [currentName, setCurrentName] = useState('');
    const [currentEmail, setCurrentEmail] = useState('');
    const [currentRole, setCurrentRole] = useState('');

    useEffect(() => {
        const userEmail = localStorage.getItem('loggedInUser')
            ? JSON.parse(localStorage.getItem('loggedInUser')!).email
            : null;

        userService.getUserByEmail(userEmail).then(async (response) => {
            const currentUser = await response.json();
            setCurrentName(currentUser.name);
            setCurrentEmail(currentUser.email);
            setCurrentRole(currentUser.role);
        });
    }, []);

    return (
        <div className="flex flex-col items-center justify-center mt-20">
            <h1 className="text-2xl font-bold mb-6">Account Statistics</h1>
            <div className="flex flex-col items-center bg-white p-6 rounded shadow-md w-full max-w-sm">
                <div className="w-full mb-4">
                    <p className="block text-sm font-medium text-gray-700">Name:</p>
                    <div className="border border-gray-300 rounded px-3 py-2 mt-1 w-full bg-gray-100">
                        {currentName}
                    </div>
                </div>

                <div className="w-full mb-4">
                    <p className="block text-sm font-medium text-gray-700">Email:</p>
                    <div className="border border-gray-300 rounded px-3 py-2 mt-1 w-full bg-gray-100">
                        {currentEmail}
                    </div>
                </div>

                <div className="w-full mb-4">
                    <p className="block text-sm font-medium text-gray-700">Account type:</p>
                    <div className="border border-gray-300 rounded px-3 py-2 mt-1 w-full bg-gray-100">
                        {currentRole}
                    </div>
                </div>
                <div className="w-full mb-4">
                    <p className="block text-sm font-medium text-gray-700">Amount of players:</p>
                    <div className="border border-gray-300 rounded px-3 py-2 mt-1 w-full bg-gray-100">
                        To be implemented
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SettingsForm;
