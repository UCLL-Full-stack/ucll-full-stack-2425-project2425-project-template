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

const getGuild = async (guildId: string) => {
    const response = await fetch(`${API_URL}/api/guilds/${guildId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
};

const addGuild = async (guild: any) => {
    const response = await fetch(`${API_URL}/api/guilds`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(guild),
    });
    return await response.json();
};

const updateGuild = async (guildId: string, guild: any) => {
    const response = await fetch(`${API_URL}/api/guilds/${guildId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(guild),
    });
    return await response.json();
};

const GuildService = {
    getGuilds,
    getGuildPermissions,
    getGuild,
    addGuild,
    updateGuild,
};

export default GuildService;