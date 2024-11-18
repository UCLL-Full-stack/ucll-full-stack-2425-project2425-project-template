const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';


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

const UserService = {
    getUser,
    addUser,
    updateUser,
};

export default UserService;