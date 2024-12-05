import { User } from '../model/user';
import userDb from '../repository/user.db';
import { AuthenticationResponse, UserInput } from '../types';
import bcrypt from 'bcrypt';
import { generateJWTtoken } from '../util/jwt';

const getAllUsers = (): Promise<User[]> => userDb.getAllUsers();

const getUserByUserName = async ({ userName }: { userName: string }): Promise<UserInput> => {
    const user = await userDb.getUserByUsername(userName);
    if (!user) throw new Error(`No user with username: ${userName}`);
    return {
        userName: user.getUserName(),
        email: user.getEmail(),
        role: user.getRole(),
        password: user.getPassword(),
    };
};

const createUser = async ({ userName, email, role, password }: UserInput): Promise<User> => {
    const existing = await userDb.getUserByUsername(userName);
    if (existing) {
        throw new Error(`Error: User with username ${userName} already exists.`);
    }
    const existingEmail = await userDb.getUserByEmail(email);
    if (existingEmail) {
        throw new Error(`Error: User with email ${email} already exists.`);
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({ userName, email, role, password: hashedPassword });

    return await userDb.createUser(user);
};

const authenicate = async ({ userName, password, email, role }: UserInput): Promise<AuthenticationResponse> => {
    const user = await getUserByUserName({ userName });
    const isValidPassword = await bcrypt.compare(password.trim(), user.password.trim());

    if (!isValidPassword) throw new Error('Incorrect password.');

    return {
        token: generateJWTtoken({ username: userName, role: user.role }),
        username: userName,
        role: user.role,
    };
};
export default { getAllUsers, createUser, authenicate, getUserByUserName };
