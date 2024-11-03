import { Competition } from '@/types';
import React from 'react';

interface TeamOverviewTableProps {
    competition: Competition;
}

const TeamOverviewTable: React.FC<TeamOverviewTableProps> = ({ competition }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Team name</th>
                </tr>
            </thead>
            <tbody>
                {competition.teams.map(team => (
                    <tr key={team.id}>
                        <td>{team.name}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default TeamOverviewTable;