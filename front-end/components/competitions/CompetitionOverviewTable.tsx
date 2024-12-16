import { useState } from 'react';

interface Team {
    id: number;
    name: string;
    wins: number;
    draws: number;
    losses: number;
    points: number;
}
const OverviewTable: React.FC = () => {
    const [teams, setTeams] = useState<Team[]>([]);
    return (
        <table className="border-collapse border border-gray-300 w-full max-w-3xl">
            <thead className="bg-gray-50">
                <tr>
                    <th className="border border-gray-300 px-4 py-2 text-left">#</th>
                    <th className="border border-gray-300 px-4 py-2 text-left">Team</th>
                    <th className="border border-gray-300 px-4 py-2 text-center">W-D-L</th>
                    <th className="border border-gray-300 px-4 py-2 text-right">Points</th>
                </tr>
            </thead>
            <tbody>
                {teams.map((team, index) => (
                    <tr key={team.id} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        <td className="border border-gray-300 px-4 py-2">{index + 1}.</td>
                        <td className="border border-gray-300 px-4 py-2">{team.name}</td>
                        <td className="border border-gray-300 px-4 py-2 text-center">
                            {team.wins} - {team.draws} - {team.losses}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-right">
                            {team.points}pt
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default OverviewTable;
