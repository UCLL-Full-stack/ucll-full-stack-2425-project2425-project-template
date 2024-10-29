import userDb from "../model/data-access/user.db"
import { User } from "../model/user";

const getAllUsers = (): User[] => {
    const users = userDb.getAllUsers();
    return users
}

const getUserById = (id: number): User => {
    const user = userDb.getUserById(id)
    if (!user) {
        throw new Error(`User with ID ${id} not found`);
    }
    return user
}

export default {getAllUsers, getUserById}