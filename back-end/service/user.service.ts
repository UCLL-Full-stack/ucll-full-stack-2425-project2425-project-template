import { Caretaker } from '../model/caretaker';
import { Manager } from '../model/manager';
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

const getAllCaretakers = async () => {
    try {
        const users = await userDb.getAllCaretakers();

        if (!users || users.length === 0) {
            throw new Error('No users found.');
        }

        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw new Error('Failed to retrieve users.');
    }
};

const createUser = async ({ username, password, role }: UserInput): Promise<User> => {
    const existingUser = await userDb.getUserByUsername({ username });

    if (existingUser) {
        throw new Error(`User with username ${username} is already registered.`);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ username, password: hashedPassword, role });

    const createdUser = await userDb.createUser(user);

    console.log('Created User:', createdUser);

    if (!createdUser.getId()) {
        throw new Error('User creation failed, ID is missing.');
    }

    if (user.getRole() === 'caretaker') {
        const caretaker = new Caretaker({
            user,
            name: username.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
        });
        await userDb.createCaretaker(caretaker, createdUser);
    } else if (user.getRole() === 'manager') {
        const manager = new Manager({
            user,
            name: username.replace(/_/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase()),
        });
        await userDb.createManager(manager, createdUser);
    } else {
        throw new Error(`Can only add user with role: "Caretaker" or "Manager"!`);
    }

    return createdUser;
};

export default {
    getAllUsers,
    getUserByUsername,
    authenticate,
    getUserById,
    deleteUser,
    getAllCaretakers,
    createUser,
};
