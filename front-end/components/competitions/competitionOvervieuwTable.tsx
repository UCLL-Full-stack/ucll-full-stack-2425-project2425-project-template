import { Competition } from '@/types';
import React from 'react';

interface CompetitionOverviewTableProps {
    competitions: Competition[];
    selectCompetition: (competition: Competition) => void;
}

const CompetitionOverviewTable: React.FC<CompetitionOverviewTableProps> = ({ competitions, selectCompetition }) => {
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Number of teams</th>
                </tr>
            </thead>
            <tbody>
                {competitions.map(competition => (
                    <tr key={competition.id} onClick={() => selectCompetition(competition)}>
                        <td>{competition.name}</td>
                        <td>{competition.teams.length}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CompetitionOverviewTable;