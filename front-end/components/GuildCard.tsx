import React from 'react';
import { Guild } from '@/types';

interface GuildCardProps {
    guild: Guild;
    onClick: (guildId: string) => void;
}

const GuildCard: React.FC<GuildCardProps> = ({ guild, onClick }) => {
    return (
        <div
            className="p-4 bg-gray-700 text-white rounded-lg hover:bg-gray-600 cursor-pointer"
            onClick={() => onClick(guild.guildId)}
        >
            <h2 className="text-lg font-bold">{guild.guildName}</h2>
        </div>
    );
};

export default GuildCard;
