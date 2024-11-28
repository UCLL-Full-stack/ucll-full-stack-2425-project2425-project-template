import { useState } from 'react';
import { useRouter } from 'next/router';
import CompetitionService from '@/services/CompetitionService';
import Head from 'next/head';

const AddCompetition: React.FC = () => {
    const [name, setName] = useState('');
    const router = useRouter();

    const handleCreateCompetition = async () => {
        try {
            await CompetitionService.addCompetition({
                name,
                teams: []
            });
            router.push('/competitions');
        } catch (error) {
            console.error('Failed to create competition:', error);
        }
    };

    const handleCancel = () => {
        router.push('/competitions');
    };

    return (
        <>
            <Head>
                <title>Add Competition</title>
            </Head>
            <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
                <h1 className="text-4xl font-bold mb-8">Add Competition</h1>
                <form onSubmit={(e) => e.preventDefault()} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
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
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={handleCreateCompetition}
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                        >
                            Create competition
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

export default AddCompetition;