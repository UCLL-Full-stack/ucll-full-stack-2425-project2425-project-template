import { useState } from 'react';
import { useRouter } from 'next/router';
import CompetitionService from '@/services/CompetitionService';
import Head from 'next/head';

const AddCompetition: React.FC = () => {
    const [name, setName] = useState('');
    const router = useRouter();

    const handleCreateCompetition = async () => {
        try {
            router.push('/competitions');
            await CompetitionService.addCompetition({
                name,
                teams: []
            });
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
            <main>
                <h1>Add Competition</h1>
                <form onSubmit={(e) => e.preventDefault()}>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </label>
                    <div>
                        <button type="button" onClick={handleCreateCompetition}>
                            Create competition
                        </button>
                        <button type="button" onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </form>
            </main>
        </>
    );
};

export default AddCompetition;