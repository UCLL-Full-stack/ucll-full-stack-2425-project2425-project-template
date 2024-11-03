import { Competition } from '@/types';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import EditCompetitionModal from './EditCompetitionModal';
import CompetitionService from '@/services/CompetitionService';

interface CompetitionOverviewTableProps {
    competitions: Competition[];
    setCompetitions: (competitions: Competition[]) => void;
    selectCompetition: (competition: Competition) => void;
}

const CompetitionOverviewTable: React.FC<CompetitionOverviewTableProps> = ({ competitions, setCompetitions, selectCompetition }) => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCompetition, setSelectedCompetition] = useState<Competition | null>(null);

    const handleEditClick = (competition: Competition) => {
        setSelectedCompetition(competition);
        setIsModalOpen(true);
        router.push(`/competitions`);
    };

    const handleSave = async (updatedCompetition: Competition) => {
        try {
            const savedCompetition = await CompetitionService.editCompetition(updatedCompetition);
            setCompetitions(competitions.map(comp => comp.id === savedCompetition.id ? savedCompetition : comp));
            setIsModalOpen(false);
            router.push(`/competitions`);
        } catch (error) {
            console.error('Failed to save competition:', error);
        }
    };

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Number of teams</th>
                        <th>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {competitions.map(competition => (
                        <tr key={competition.id} onClick={() => selectCompetition(competition)}>
                            <td>{competition.name}</td>
                            <td>{competition.teams.length}</td>
                            <td>
                                <button onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditClick(competition);
                                }}>
                                    Edit
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <EditCompetitionModal
                competition={selectedCompetition}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
            />
        </>
    );
};

export default CompetitionOverviewTable;