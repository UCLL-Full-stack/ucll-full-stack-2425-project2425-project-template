import UserDb from "../repository/User.db";
import { User } from "../model/User";
import bcrypt from "bcrypt"


const getAllUsers = async (): Promise<User[]> => {
    return UserDb.getAllUsers();
};

const getUserById = async (id: number): Promise<User | null> => {
    return UserDb.getUserById(id);
};

const getUserByEmail = async (email: string): Promise<User | null> => {
    return UserDb.getUserByEmail(email);
}

const getUserByUsername = async (username: string): Promise<User | null> => {
    return UserDb.getUserByUsername(username);
}

const createUser = async (user: User): Promise<User> => {
    // Check if the email already exists
    const existingUserByEmail = await UserDb.getUserByEmail(user.email);
    if (existingUserByEmail) {
        throw new Error("Email already exists");
    }

    // Check if the username already exists
    const existingUserByUsername = await UserDb.getUserByUsername(user.username);
    if (existingUserByUsername) {
        throw new Error("Username already exists");
    }

    // If checks pass, hash the password and create the user
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = new User(user.username, hashedPassword, user.email, user.firstName, user.lastName, [], []);
    return UserDb.createUser(newUser);
};

export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
    getUserByUsername,
    createUser,
};