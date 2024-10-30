import { User } from "../model/user";

const users:User[] = [];

const getAllUsers = (): User[] => users; 

const createUser = (user: User): User => {
    users.push(user);
    return user;
};


export default {createUser, getAllUsers};