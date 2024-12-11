import { User } from "@/types";

const getToken = () => {
    return JSON.parse(sessionStorage.getItem('loggedInUser') || '{}').token;
}

const createGroup = (name: String, description: String, users?: User[]) => {
    const data = {
        name: name,
        description: description,
        users: users
    };

    const jsonData = JSON.stringify(data);

    const token = getToken();

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
        },
        body: jsonData
    });
};

const getGroups = () => {
    const token = getToken();

    return fetch(`${process.env.NEXT_PUBLIC_API_URL}/groups`, {
        method: 'Get',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export default {
    createGroup,
    getGroups,
};