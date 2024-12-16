import bcrypt from 'bcrypt';
import { User } from '../model/user';
import userDB from '../repository/user.db';
import { AuthenticationResponse, UserInput } from '../types';
import { generateJwtToken } from '../util/jwt';

const getAllUsers = async (): Promise<User[]> => {
    return await userDB.getAllUsers();
};

const getUserByEmail = async (email: string): Promise<User> => {
    const user = await userDB.getUserByEmail(email);
    if (!user) {
        throw new Error('User not found.');
    }
    return user;
};

const createUser = async ({ name, email, password, birthday }: UserInput): Promise<User> => {
    if (!name) {
        throw new Error('Name is required.');
    }
    if (!name) {
        throw new Error('Email is required.');
    }
    if (!password) {
        throw new Error('Password is required.');
    }
    if (!birthday) {
        throw new Error('Birthday is required.  ');
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

export default {
    getAllUsers,
    createUser,
    getUserByEmail,
    authenticate,
};
