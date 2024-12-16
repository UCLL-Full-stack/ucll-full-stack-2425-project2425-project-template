import { Competition } from '@/types';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
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
    };

    const handleSave = async (updatedCompetition: Competition) => {
        try {
            const savedCompetition = await CompetitionService.editCompetition(updatedCompetition);
            setCompetitions(competitions.map(comp => comp.id === savedCompetition.id ? savedCompetition : comp));
            setIsModalOpen(false);
            router.refresh();
        } catch (error) {
            console.error('Failed to save competition:', error);
        }
    };

    return (
        <>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Name</th>
                        <th className="py-3 px-6 text-left">Number of teams</th>
                        <th className="py-3 px-6 text-center">Edit</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {competitions.map(competition => (
                        <tr key={competition.id} className="border-b border-gray-200 hover:bg-gray-100" onClick={() => selectCompetition(competition)}>
                            <td className="py-3 px-6 text-left cursor-pointer hover:underline">{competition.name}</td>
                            <td className="py-3 px-6 text-left">{competition.teams.length}</td>
                            <td className="py-3 px-6 text-center">
                                <button
                                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleEditClick(competition);
                                    }}
                                >
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