const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const getUsers = async () => {
    const response = await fetch(`${API_URL}/api/users`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
};

const getUser = async (userId: string) => {
    const response = await fetch(`${API_URL}/api/users/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
};

const addUser = async (user: any) => {
    const response = await fetch(`${API_URL}/api/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    return await response.json();
};

const updateUser = async (userId: string, user: any) => {
    const response = await fetch(`${API_URL}/api/users/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });
    return await response.json();
};

const getGuilds = async (userId: string) => {
    const response = await fetch(`${API_URL}/api/users/${userId}/guilds`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
};

const getUserGuildKanbanPermissions = async (userId: string, guildId: string) => {
    const response = await fetch(`${API_URL}/api/users/${userId}/guilds/${guildId}/kanban-permissions`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
};

const getAllKanbanPermissionsForBoard = async (userId: string, boardId: string) => {
    const response = await fetch(`${API_URL}/api/users/${userId}/boards/${boardId}/kanban-permissions`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
};

const UserService = {
    getUsers,
    getUser,
    addUser,
    updateUser,
    getGuilds,
    getUserGuildKanbanPermissions,
    getAllKanbanPermissionsForBoard,
};

export default UserService;