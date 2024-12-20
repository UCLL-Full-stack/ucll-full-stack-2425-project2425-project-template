import bcrypt from 'bcrypt';
import { User } from '../model/user';
import userDB from '../repository/user.db';
import { AuthenticationResponse, UserInput } from '../types';
import { generateJwtToken } from '../util/jwt';

const getAllUsers = async (): Promise<User[]> => {
    return await userDB.getAllUsers();
};

const getUserByEmail = async (email: string): Promise<User | null> => {
    try {
        const user = await userDB.getUserByEmail(email);
        return user;
    } catch (error) {
        return null;
    }
};

const createUser = async ({ name, email, password, birthday }: UserInput): Promise<User> => {
    if (!name) {
        throw new Error('Name is required.');
    }
    if (!email) {
        throw new Error('Email is required.');
    }
    if (!password) {
        throw new Error('Password is required.');
    }
    if (!birthday) {
        throw new Error('Birthday is required.');
    }

    if (await userDB.getUserByEmail(email)) {
        throw new Error('User already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
        name,
        email,
        role: 'user', // user is default role, can only be changed in DB.
        password: hashedPassword,
        birthday,
    });

    try {
        const addedUser = await userDB.createUser(newUser);
        if (!addedUser) {
            throw new Error('User not added.');
        }
        return addedUser;
    } catch (error) {
        throw new Error('User not added.');
    }
};

const authenticate = async ({ email, password }: UserInput): Promise<AuthenticationResponse> => {
    const user = await getUserByEmail(email);
    if (!user) {
        throw new Error('User not found.');
    }
    const isPasswordValid = await bcrypt.compare(password, user.getPassword());
    if (!isPasswordValid) {
        throw new Error('Invalid password.');
    }
    return {
        token: generateJwtToken({ email: user.getEmail(), role: user.getRole() }),
        email: user.getEmail(),
        role: user.getRole(),
    };
};

const updateUser = async (userInput: UserInput): Promise<User> => {
    const existingUser = await getUserByEmail(userInput.email);
    if (!existingUser) {
        throw new Error('User not found.');
    }
    const updatedUser = new User({
        ...existingUser,
        ...userInput,
        role: existingUser.getRole(),
    });
    const result = await userDB.updateUser(updatedUser);
    if (!result) {
        throw new Error('User not updated.');
    }
    return result;
};

export default {
    getAllUsers,
    createUser,
    getUserByEmail,
    authenticate,
    updateUser,
};
