import { Competition } from '../model/competition';
import { User } from '../model/user';
import competitionDb from '../repository/competition.db';
import userDb from '../repository/user.db';

const getAllUsers = (): User[] => {
    return userDb.getAllUsers();
};

const getUserById = (id: number): User => {
    const user = userDb.getUserById({ id });
    if (!user) throw new Error(`User with id ${id} does not exist.`);
    return user;
};

const getUserByName = async ({ name }: { name: string }): Promise<User> => {
    const user = await userDB.getUserByName({ name });
    if (!user) {
        throw new Error(`User with username: ${name} does not exist.`);
    }
    return user;
};

export default { getAllUsers, getUserById };
