import { Competition } from '@/types';
import React from 'react';
import { useRouter } from 'next/router';

interface TeamOverviewTableProps {
    competition: Competition;
}

const TeamOverviewTable: React.FC<TeamOverviewTableProps> = ({ competition }) => {
    const router = useRouter();

    const handleTeamClick = (teamId: number) => {
        router.push(`/players?teamId=${teamId}`);
    };
    
    return (
        <table className="min-w-full bg-white border border-gray-200">
            <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Team name</th>
                </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
                {competition.teams.map(team => (
                    <tr key={team.id} className="border-b border-gray-200 hover:bg-gray-100"
                    onClick={() => handleTeamClick(team.id)}>
                        <td className="py-3 px-6 text-left">{team.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TeamOverviewTable;