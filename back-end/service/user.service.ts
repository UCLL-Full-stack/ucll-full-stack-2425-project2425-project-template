import { User } from '../model/user';
import userDb from '../repository/user.db';
import { AuthenticationResponse, UserInput } from '../types';
import { generateJwtToken } from '../util/jwt';
import bcrypt from 'bcrypt';

const getAllUsers = async () => {
    try {
        const users = await userDb.getAllUsers();

        if (!users || users.length === 0) {
            throw new Error('No users found.');
        }

        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to retrieve users.');
    }
};

const getUserByUsername = async ({ username }: { username: string }): Promise<User> => {
    const user = await userDb.getUserByUsername({ username });
    if (!user) {
        throw new Error(`User with username: ${username} does not exist.`);
    }
    return user;
};

const authenticate = async ({ username, password }: UserInput): Promise<AuthenticationResponse> => {
    const user = await getUserByUsername({ username });

    const isValidPassword = await bcrypt.compare(password, user.getPassword());

    if (!isValidPassword) {
        throw new Error('Incorrect password.');
    }

    return {
        token: generateJwtToken({ username, role: user.getRole() }),
        username: username,
        role: user.getRole(),
    };
};

const getUserById = async (id: number): Promise<User> => {
    const user = await userDb.getUserById({ id });
    if (!user) throw new Error('User not found.');
    return user;
};

const deleteUser = async ({ username }: { username: string }) => {
    return await userDb.deleteUser({ username });
};


export default {
    getAllUsers,
    getUserByUsername,
    authenticate,
    getUserById,
    deleteUser,
};
