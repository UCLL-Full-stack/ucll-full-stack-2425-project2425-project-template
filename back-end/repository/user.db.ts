import {User} from "../model/user"
import { Role } from "../types"

// empty userlist
const users: User[] = []

// making new users to fill the list
users.push(new User({name: "Jorrit", email: "jorrit@email.com", password: "UnhackableHackmaster123", role: 'admin'}));
users.push(new User({name: "John", email: "john@email.com", password: "VerySecure123", role: 'parent'}));
users.push(new User({name: "Johnjr", email: "johnjr@email.com", password: "VerySecure123", role: 'child'}));

//----functions----//

// GET
const getAllUsers = (): User[] => {
    return users;
}

const getUserByEmail = (email:string): User | undefined => {
    return users.find((user) => user.getEmail() === email);
}

// Post
const createUser = (user: User) => {
    users.push(user);
}

// export functions
export default {
    getAllUsers,
    getUserByEmail,
    createUser
}