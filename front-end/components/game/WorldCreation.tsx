import { useState, useEffect } from 'react';
import { User, WorldInput } from '@types';
import worldService from '@services/worldService';
import { useRouter } from 'next/router';
import useInterval from 'use-interval';

const WorldCreation: React.FC = () => {
    const router = useRouter();
    const [loggedInUser, setLoggedInUser] = useState<User>();

    const [name, setName] = useState('');
    const [nameError, setNameError] = useState('');
    const [statusMessages, setStatusMessages] = useState({ message: '', type: '' });
    const [timer, setTimer] = useState<number>(0);

    const validate = (): boolean => {
        let result = true;
        if (!name || name.trim() === '') {
            setNameError('Name is required');
            result = false;
        } else {
            setNameError('');
        }
        return result;
    };

    const clearErrors = () => {
        setNameError('');
        setStatusMessages({ message: '', type: '' });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        clearErrors();
        if (!validate()) {
            return;
        }
        if (loggedInUser){
            const input: WorldInput = {name: name, email: loggedInUser.email}
            const response = await worldService.generateWorld(input);
    
            if (response.status === 200) {
                setStatusMessages({ message: 'Creation Successful', type: 'success' });
                setStatusMessages({
                    message: 'World created succesfully, redirecting...',
                    type: 'success',
                });
    
                setTimeout(() => {
                    router.push('/game/worlds');
                }, 2000);
            } else {
                setStatusMessages({ message: 'Oops, something went wrong', type: 'error' });
            }
        }
    };

    useInterval(() => {
        if (timer >= 10){
            setTimer(0);
        }
        setTimer(timer + 1);
    }, 50);

    useEffect(() => {
        const user = localStorage.getItem('loggedInUser');
        if (user) {
            setLoggedInUser(JSON.parse(user));
        }
    }, []);

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

            <h1 className="text-2xl font-bold mb-6">World Creation</h1>
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center bg-white p-6 rounded shadow-md w-full max-w-sm"
            >
                <div className="w-full mb-4">
                    <label htmlFor="nameInput" className="block text-sm font-medium text-gray-700">
                        Name of World:
                    </label>
                    {nameError && (
                        <div className="text-red-500 text-sm mt-1">{nameError}</div>
                    )}
                    <input
                        id="nameInput"
                        type="text"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        className="border border-gray-300 rounded px-3 py-2 mt-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-medium py-2 rounded mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Create World
                </button>
            </form>
        </div>
    );
};

export default WorldCreation;