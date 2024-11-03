const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const getGuilds = async () => {
    const response = await fetch(`${API_URL}/api/guilds`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
};

const getGuildPermissions = async (guildId: string) => {
    const response = await fetch(`${API_URL}/api/guilds/${guildId}/permissions`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
};

const GuildService = {
    getGuilds,
    getGuildPermissions,
};

export default GuildService;