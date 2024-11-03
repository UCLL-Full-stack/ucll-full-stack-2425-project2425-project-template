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

const UserService = {
    getUser,
};

export default UserService;