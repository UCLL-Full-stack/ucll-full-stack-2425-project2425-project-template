const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const getBoard = async (boardId: string) => {
    const response = await fetch(`${API_URL}/api/boards/${boardId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
};

const getBoardsByGuild = async (guildId: string) => {
    const response = await fetch(`${API_URL}/api/boards/guild/${guildId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
};

const createBoard = async (board: any) => {
    const response = await fetch(`${API_URL}/api/boards`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(board),
    });
    return await response.json();
};

const deleteBoard = async (boardId: string) => {
    const response = await fetch(`${API_URL}/api/boards/${boardId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return await response.json();
};

const BoardService = {
    getBoard,
    getBoardsByGuild,
    createBoard,
    deleteBoard,
};

export default BoardService;