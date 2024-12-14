import { id } from 'date-fns/locale';
import { User } from '../model/user';
import userDb from '../repository/user.db';
import { UserInput } from '../types';

const createUser = ({username, email, password}: UserInput): User => {

    if (password.length < 8) {
        throw new Error("Password needs to be 8 characters long.");
    }

    const user = new User({
        username,
        email,
        password
    });

    return userDb.createUser({
        username: user.getUsername(),
        email: user.getEmail(),
        password: user.getPassword()
    })
}

export default {createUser}   