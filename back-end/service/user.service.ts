import userDb from '../repository/user.db';
import { User } from '../model/user';
import bcrypt from 'bcrypt';
import { generateJwtToken } from '../util/jwt';
import { AuthenticationResponse, UserInput } from '../types';

const getAllUsers = async (): Promise<User[]> => userDb.getAllUsers();

const getUserByEmail = async (email: string): Promise<User | null> => userDb.getUserByEmail(email);

const deleteUserById = async (id: number): Promise<User> => userDb.deleteUserById(id);

const addUser = async ({ name, password, email, role }: UserInput): Promise<User> => {
    const existingUser = await userDb.getUserByEmail(email);
    if (existingUser) {
        throw new Error(`User with email ${email} already exists.`);
    }
    const hashedPass = await bcrypt.hash(password, 12);
    const user = new User({ name, password: hashedPass, email, role });
    return userDb.addUser(user);
};

const authenticate = async ({ email, password, role }: UserInput): Promise<AuthenticationResponse> => {
    const user = await userDb.getUserByEmail(email);

    if (!user) {
        throw new Error(`User with email: ${email} could not be found.`);
    }
    const isValidPassword = await bcrypt.compare(password, user.getPassword());
    if (!isValidPassword) {
        throw new Error('Invalid password');
    }

    return {
        token: generateJwtToken({ email, role: role }),
        email: email,
        role: role
    };
};

export default { getAllUsers, getUserByEmail, deleteUserById, addUser, authenticate };
