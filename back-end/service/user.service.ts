import { User } from '../model/user';
import userDB from '../repository/user.db';
import { AuthenticationResponse, UserInput } from '../types';
import bcrypt from 'bcrypt'
import { generateJwtToken } from '../util/jwt';

const getAllUsers = async (): Promise<User[]> => userDB.getAllUsers();

const getUserByUsername = async ({ username }: { username: string }): Promise<User> => {
    const user = await userDB.getUserByUsername({ username });
    if (!user) {
        throw new Error(`User with username: ${username} does not exist.`);
    }
    return user;
};

const createUser = async ({username, firstName, lastName, email, role, password}: UserInput): Promise<User> => {
    if (!username) {
        throw new Error('Username is required');
    }
    const existingUser = await userDB.getUserByUsername({ username });

    if (existingUser) {
        throw new Error(`User with username: ${username} already exists`)
    }

    if (!username?.trim()) {
        throw new Error('Username is required')
    }

    if (!firstName?.trim()) {
        throw new Error('First name is required')
    }
    
    if (!email?.trim()) {
        throw new Error('Email is required')
    }

    if (!lastName?.trim()) {
        throw new Error('Last name is required')
    }

    if (!password?.trim()) {
        throw new Error('Password is required')
    }

    if (!role?.trim()) {
        throw new Error('Role is required')
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ username, password: hashedPassword, firstName, lastName, email, role })

    return await userDB.createUser(user)
}

const authenticate = async ({ username, password }: UserInput): Promise<AuthenticationResponse> => {
    if (!username) {
        throw new Error('Username is required');
    }

    if (!password) {
        throw new Error('Username is required');
    }
    
    const user = await getUserByUsername({ username })

    const isValidPassword = await bcrypt.compare(password, user.getPassword())

    if (!isValidPassword) {
        throw new Error('Incorrect password.')
    }
    return {
        token: generateJwtToken({ username, role: user.getRole() }),
        username: username,
        fullname: `${user.getFirstName()} ${user.getLastName()}`,
        role: user.getRole(),
        id: user.getId()
    };
};

export default { getUserByUsername, getAllUsers, createUser, authenticate };
