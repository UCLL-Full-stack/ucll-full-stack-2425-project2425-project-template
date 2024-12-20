import { User } from '../model/user';
import userDb from '../repository/user.db';
import { AuthenticationResponse, UserInput } from '../types';
import bcrypt from 'bcrypt';
import { generateJWTtoken } from '../util/jwt';

const getAllUsers = async (): Promise<User[]> => {
    const users = await userDb.getAllUsers();
    if (!users) {
        throw new Error('No users found');
    }
    return users;
};

const getUserById = async (id: string): Promise<User> => {
    const user = await userDb.getUserById({ id });
    if (!user) {
        throw new Error(`User with ID ${id} not found`);
    }
    return user;
};

const getUserByEmail = async ({ email }: { email: string }): Promise<User> => {
    const user = await userDb.getUserByEmail({ email });
    if (!user) {
        throw new Error(`User with email ${email} not found`);
    }
    return user;
};

const getProfileByUserId = async ({ userId }: { userId: string }): Promise<User> => {
    const user = await userDb.getProfileByUserId({ userId });
    if (!user) {
        throw new Error(`Profile with user ID ${userId} not found`);
    }
    return user;
};

const createUser = async (user: UserInput): Promise<User> => {
    const existingUser = await userDb.getUserByEmail({ email: user.email });
    if (existingUser) {
        throw new Error(`User with email: ${user.email} already exist.`);
    }

    const hashedPassword = await bcrypt.hash(user.password, 12);

    const createdUser = new User({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: hashedPassword,
        role: user.role,
        profile: user.profile,
    });

    return await userDb.createUser(createdUser);
};

async function authenticate({ id, email, password }: UserInput): Promise<AuthenticationResponse> {
    const user = await userDb.getUserByEmail({ email });
    if (!user) {
        throw new Error(`User with email: ${email} not found`);
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
        throw new Error('Invalid password');
    }

    if (!user.id) {
        throw new Error('User ID is undefined');
    }
    const token = generateJWTtoken({id: user.id, email: user.email, role: user.role });
    return {
        token,
        id: user.id,
        email: user.email,
        role: user.role,
        fullname: `${user.firstName} ${user.lastName}`,
    };
}
export default { getAllUsers, getUserById, getUserByEmail, createUser, authenticate, getProfileByUserId };
