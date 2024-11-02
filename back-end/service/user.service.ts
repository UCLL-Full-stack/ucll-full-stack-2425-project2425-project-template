import userDb from "../repository/user.db";
import { User } from "../model/user";

const getAllUsers = (): User[] => {
    return userDb.getAllUsers();
}

const getUserById = (id: number): User => {
    return userDb.getUserById(id);
}

const addUser = (userData: { name: string, email: string, password: string }): User => {
    const newUser = new User({
        id: 0, //temp will be replaced in db
        name: userData.name,
        email: userData.email,
        password: userData.password
    });
    
    return userDb.addUser(newUser);
}

export default { getAllUsers, getUserById, addUser };
