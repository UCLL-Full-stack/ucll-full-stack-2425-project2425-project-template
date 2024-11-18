import bcypt from 'bcrypt';
import userDB from '../repository/user.db';
import { User } from '../model/user';
import { AuthenticationResponse, UserInput } from '../types';

const getUserByUsername = async ({ username }: { username: string }): Promise<User> => {
    const user = await userDB.getUserByUsername({ username });
    if (!user) {
        throw new Error(`No user with username: ${username} does not exist`);
    }
    return user;
};

const authenticate = async ({ username, password }: UserInput): Promise<AuthenticationResponse> => {
    const user = await getUserByUsername({ username });

    const isValidPassword = await bcypt.compare(password, user.password);

    if (!isValidPassword) {
        throw new Error('Incorrect password');
    }
    return {
        token: '',
        username: username,
    };
};

export default { getUserByUsername, authenticate };