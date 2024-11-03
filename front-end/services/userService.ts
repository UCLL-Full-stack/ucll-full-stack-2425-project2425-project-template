import { User } from "@/types/index";

const getUserById = async (id: number): Promise<User> => {
    const userJson = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`);
    return await userJson.json();
}

const registerUser = async (user: User): Promise<User> => {
    const newUser = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`,{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });

    return await newUser.json();
}

export default {
    getUserById,
    registerUser
}
