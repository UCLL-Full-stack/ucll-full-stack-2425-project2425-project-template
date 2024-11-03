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

    // Ensure the password is provided
    if (!user.password) {
        throw new Error("Password is required");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // Create the new user object with the hashed password
    const newUser = new User(user.username, hashedPassword, user.email, user.firstName, user.lastName, [], []);

    // Save the new user to the database
    return UserDb.createUser(newUser);
};


export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
    getUserByUsername,
    createUser,
};