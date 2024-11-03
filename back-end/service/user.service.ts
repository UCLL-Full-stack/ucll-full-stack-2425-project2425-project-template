import userDB from '../repository/user.db';
import { User } from '../model/user';

const getUserById = (id: number): User => {
    const user = userDB.getUserById({ id });
    if (!user) throw new Error(`User with id ${id} does not exist`);
    return user;
}

export default { getUserById };