import Head from 'next/head';
import { useEffect, useState } from 'react';
import TeamService from '@services/TeamsService';
import Header from '@components/header';

interface Competition {
    id: number;
    name: string;
}

interface Team {
    id: number;
    name: string;
    points: number;
    competitionId: number;
}

const Competition: React.FC = () => {
    const [competitions, setCompetitions] = useState<Competition[]>([]);
    const [selectedCompetitionId, setSelectedCompetitionId] = useState<number | null>(null);
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCompetitions = async () => {
            try {
                const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/competitions');
                if (!response.ok) throw new Error('Failed to fetch competitions');
                const data = await response.json();
                setCompetitions(data);
            } catch (err: any) {
                setError(err.message);
            }
        };

        fetchCompetitions();
    }, []);

    useEffect(() => {
        if (selectedCompetitionId === null) return;

        const fetchTeams = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await TeamService.fetchTeamsByCompetition(selectedCompetitionId);
                if (!response.ok) throw new Error('Failed to fetch teams');
                const data = await response.json();
                setTeams(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTeams();
    }, [selectedCompetitionId]);

    const handleAddTeamClick = () => {
        alert('Add team clicked!');
    };

    const handleBackButtonClick = () => {
        setSelectedCompetitionId(null);
        setTeams([]);
    };

    return (
        <>
            <Head>
                <title>Competitions</title>
            </Head>
            <Header />
            <main className="h-screen bg-gray-100 relative">
                {selectedCompetitionId !== null && (
                    <button
                        onClick={handleBackButtonClick}
                        className="absolute top-4 left-4 bg-gray-300 text-black px-4 py-2 rounded bg-transparent border border-white cursor-pointer"
                    >
                        Back to Competitions
                    </button>
                )}

                {selectedCompetitionId === null ? (
                    <>
                        <div className="text-center">
                            <h1 className="font-semibold">Select a Competition</h1>
                            {error && <p className="text-red-500">{error}</p>}
                            <ul>
                                {competitions.map((competition) => (
                                    <li
                                        key={competition.id}
                                        className={`cursor-pointer ${
                                            competition.id === selectedCompetitionId
                                                ? 'text-blue-500'
                                                : 'text-black'
                                        }`}
                                        onClick={() => setSelectedCompetitionId(competition.id)}
                                    >
                                        {competition.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </>
                ) : (
                    <>
                        <h1 className="font-semibold text-center">
                            {competitions.find((c) => c.id === selectedCompetitionId)?.name}
                        </h1>
                        {loading ? (
                            <p>Loading teams...</p>
                        ) : (
                            <table className="border border-gray-300 mx-auto w-full max-w-4xl">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className="text-center px-4 py-2 w-2/3">Team</th>{' '}
                                        <th className="text-center px-4 py-2 w-1/3">Points</th>{' '}
                                    </tr>
                                </thead>
                                <tbody>
                                    {teams.map((team) => (
                                        <tr
                                            key={team.id}
                                            className="border border-b border-gray-300"
                                        >
                                            <td className="px-4 py-2">{team.name}</td>
                                            <td className="text-center px-4 py-2">{team.points}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <td className="px-2 py-2" colSpan={2}>
                                            <button
                                                onClick={handleAddTeamClick}
                                                className="bg-transparent border border-white cursor-pointer"
                                            >
                                                + Add Team
                                            </button>
                                        </td>
                                    </tr>
                                </tfoot>
                            </table>
                        )}
                    </>
                )}
            </main>
        </>
    );
};

export default Competition;
