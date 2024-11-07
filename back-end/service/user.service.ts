import userDB from "../repository/user.db";
import { User } from "../model/user";
import { UserInput } from "../types";

// Create a new user
const createUser = async ({ firstName, lastName, email, password, role }: UserInput): Promise<User> => {
    if (!firstName || !lastName || !email || !password || !role) {
        throw new Error("All fields are required");
    }

    const user = await userDB.createUser({
        firstName,
        lastName,
        email,
        password,
        role
    });

    if (!user) {
        throw new Error("User creation failed");
    }

    return User.from(user);
};


// Get all users
const getAllUsers = async (): Promise<User[]> => {
    const users = await userDB.getAllUsers();
    return users.map(User.from);
};

// Get a user by email
const getUserByEmail = async (email: string): Promise<User> => {
    const user = await userDB.getUserByEmail(email);

    if (!user) {
        throw new Error(`User with email "${email}" doesn't exist`);
    }

    return User.from(user);
};

export default {
    createUser,
    getAllUsers,
    getUserByEmail,
};
