import { User } from '../model/user';
import userDB from '../repository/user.db';
import bcrypt from 'bcrypt';
import { generateSWTtoken } from '../util/jwt';
import { UserInput, AuthenticationResponse, Role } from '../types';

const getAllUsers = async (): Promise<User[]> => userDB.getAllUsers();

const getUserByUsername = async ({ name }: { name: string }): Promise<User> => {
    const user = await userDB.getUserByUsername({ name });
    if (!user) {
        throw new Error('User not found.');
    }
    return user;
};

const createUser = async (userInput: UserInput): Promise<User> => {
    const existingUser = await userDB.getUserByUsername({ name: userInput.name });
    if (existingUser) {
        throw new Error('User already exists.');
    }

    const hashedPassword = await bcrypt.hash(userInput.password, 12);

    const newUser = {
        ...userInput,
        password: hashedPassword,
    };

    return await userDB.createUser(newUser);
};

const authenticate = async (username: string, password: string, role: Role): Promise<AuthenticationResponse> => {
    const user = await userDB.getUserByUsername({ username });
    if (!user) {
        throw new Error('Invalid username or password.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.getPassword());
    if (!isPasswordValid) {
        throw new Error('Invalid username or password.');
    }

    const token = generateSWTtoken(user.getName(), role);
    const name = user.getName();

    return {
        username: user.getUsername(),
        token,
        name,
        role,
    };
};

export default { getUserByUsername, getAllUsers, createUser, authenticate };