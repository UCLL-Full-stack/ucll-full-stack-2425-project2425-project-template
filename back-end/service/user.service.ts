import { User } from "../model/user";
import userDb from "../repository/user.db";

const createUser = async (user: User): Promise<User> => {
    user.register();
    userDb.createUser(user);
    return user;
};

const getAllUsers = async (): Promise<User[]> => userDb.getAllUsers();

export default { createUser, getAllUsers }