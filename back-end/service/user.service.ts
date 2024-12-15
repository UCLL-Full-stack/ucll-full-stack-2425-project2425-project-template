import { id } from 'date-fns/locale';
import { User } from '../model/user';
import userDb from '../repository/user.db';
import { UserInput } from '../types';

const createUser = async ({id, username, email, password}: UserInput): Promise<User> => {

    if (password.length < 8) {
        throw new Error("Password needs to be 8 characters long.");
    }

    const user = new User({
        id: 1,
        username,
        email,
        password,
    });

    return await userDb.createUserWithAccount({
        id: user.getId() || 0,
        username: user.getUsername(),
        email: user.getEmail(),
        password: user.getPassword(),
        bio: ''
    });
}

export default {createUser}   