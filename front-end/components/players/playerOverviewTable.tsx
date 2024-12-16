import { Player } from '@/types';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface PlayerOverviewTableProps {
    players: Player[];
    setPlayers: (players: Player[]) => void;
}

const PlayerOverviewTable: React.FC<PlayerOverviewTableProps> = ({ players, setPlayers }) => {
    const router = useRouter();
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                        <th className="py-3 px-6 text-left">Name</th>
                        <th className="py-3 px-6 text-left">Number</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {players.map(player => (
                        <tr key={player.id} className="border-b border-gray-200 hover:bg-gray-100">
                            <td className="py-3 px-6 text-left cursor-pointer hover:underline">{player.user.name}</td>
                            <td className="py-3 px-6 text-left">{player.number}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default PlayerOverviewTable;