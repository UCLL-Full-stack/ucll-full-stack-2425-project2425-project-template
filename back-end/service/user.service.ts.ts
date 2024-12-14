import userDb from '../repository/user.db';
import { User } from '../model/user';
import { UserSignupInput, AuthenticationResponse, UserLoginInput } from '../types';
import { Profile } from '../model/profile';
import bcrypt from 'bcrypt';
import { generateJWTtoken } from '../util/jwt';

const getAllUsers = async (): Promise<User[]> => await userDb.getAllUsers();

// const getAllUsers = async (role: Role, username: string): Promise<Schedule[]> => {
//     if (role === 'admin') {
//         return await scheduleDb.getAllUsers();
//     } else {
//         throw new Error('You do not have access to this resource.');
//     }
// };

const getUserById = async (id: number): Promise<User> => {
    const user = await userDb.getUserById({ id });
    if (!user) throw new Error(`User with id ${id} does not exist.`);
    return user;
};

const getUserByUsername = async (username: string): Promise<User> => {
    const user = await userDb.getUserByUsername({ username });
    if (!user) throw new Error(`User with username ${username} does not exist.`);
    return user;
};

const createUser = async ({ firstName, lastName, username, email, password,   }: UserSignupInput): Promise<User> => {
    const profile = new Profile({ firstName, lastName, email });
    const hashedPassword = await bcrypt.hash(password, 12); 
    const user = new User({ username, password: hashedPassword, profile });
    // profile.setUser(user);
    return await userDb.addUser({ user });
};

const authenticate = async ({ username, password }: UserLoginInput): Promise<AuthenticationResponse> => {
    const user = await userDb.getUserByUsername({ username });
    if (!user) {
        throw new Error('Invalid username or password.');
    }

    const isValidPass = await bcrypt.compare(password, user.getPassword());
    if (!isValidPass) {
        throw new Error('Invalid username or password.');
    }

    return {
        token: generateJWTtoken(user.getUsername()), 
        username: user.getUsername(),
        fullname: `${user.getProfile()?.getFirstName() ?? ''} ${user.getProfile()?.getLastName() ?? ''}`,
        // role: user.getRole(),
    };
};

export default { getAllUsers, getUserById, getUserByUsername, createUser, authenticate };
