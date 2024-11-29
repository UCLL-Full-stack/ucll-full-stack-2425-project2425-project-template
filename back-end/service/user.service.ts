import { User } from "../model/user";
import userDb from "../repository/user.db"
import { UserInput } from "../types";
import bcrypt, { hash } from 'bcrypt';

const getAllUsers = async (): Promise<User[]> => {
    return userDb.getAllUsers();
};

const getUserById = async (id: number): Promise<User | null> => {
    return userDb.getUserById({ id });
};

const getUserByEmail = async (email: string): Promise<User | null> => {
    return userDb.getUserByEmail(email);
};

const createUser = async (user: UserInput): Promise<User> => {
    const userExisted = await getUserByEmail(user.email);

    if (userExisted){
        throw new Error("This email has already been used.");
    }

    const hashedPass = await bcrypt.hash(user.password, 12);

    const newUser = new User({
            username: user.username,
            name: user.name,
            email: user.email,
            password: hashedPass,
            age: user.age,
            role: user.role,
    });

    return userDb.createUser(newUser);
}

export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
}