import { useState } from 'react';
import { useRouter } from 'next/router';
import PlayerService from '@/services/PlayerService';
import Head from 'next/head';
import UserService from '@/services/UserService';

const AddPlayer: React.FC = () => {
    const [number, setNumber] = useState(0);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const router = useRouter();

    const handleCreatePlayer = async () => {
        try {
            await PlayerService.addPlayer({
                number,
                user: {
                    name,
                    email,
                    role: 'player',
                },
            });
            await UserService.createUser({
                name,
                email,
                role: 'player',
            });
            router.push('/players');
        } catch (error) {
            console.error('Failed to create player:', error);
        }
    };

    const handleCancel = () => {
        router.push('/players');
    };

    return (
        <>
            <Head>
                <title>Add Player</title>
            </Head>
            <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <h1 className="text-4xl font-bold mb-8">Add PLayer</h1>
                <form onSubmit={(e) => e.preventDefault()} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                    <label className="block mb-4">
                        <span className="text-gray-700">Number:</span>
                        <input
                            type="number"
                            value={number}
                            onChange={(e) => setNumber(Number(e.target.value))}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </label>
                    <label className="block mb-4">
                        <span className="text-gray-700">Name:</span>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </label>
                    <label className="block mb-4">
                        <span className="text-gray-700">Email:</span>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </label>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={handleCreatePlayer}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Create player
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </main>
        </>
    );
};

export default AddPlayer;