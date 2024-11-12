import userDb from '../repository/user.db';
import { User } from '../model/user';
import { UserSignupInput } from '../types';
import { Profile } from '../model/profile';

const getAllUsers = (): User[] => userDb.getAllUsers();

const getUserById = (id: number): User => {
    const user = userDb.getUserById({ id });
    if (!user) throw new Error(`User with id ${id} does not exist.`);
    return user;
};

const createUser = ({ firstName, lastName, username, email, password }: UserSignupInput): User => {
    const profile = new Profile({ firstName, lastName, email });
    const user = new User({ username, password, profile });
    // profile.setUser(user);
    return userDb.addUser(user);
};

export default { getAllUsers, getUserById, createUser };
