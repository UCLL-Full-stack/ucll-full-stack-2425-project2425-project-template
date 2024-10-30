// src/repository/user.db.ts
import { User } from '../model/user';
import { Role } from '../types';

const users: User[] = [];

// Function to retrieve all users
const getAllUsers = (): User[] => {
    return users;
};

// Function to retrieve a user by ID
const getUserById = (id: number): User | null => {
    const user = users.find((user) => user.getId() === id);
    return user || null;
};

// Function to retrieve a user by name
const getUserByName = (name: string): User | null => {
    const user = users.find((user) => user.getName() === name);
    return user || null;
};

// Function to save a new user
const saveUser = (userData: { name: string; password: string; role: Role }): User => {
    const newUser = new User({ id: users.length + 1, ...userData });
    users.push(newUser);
    return newUser;
};

// Export the repository functions as an object for easy import
export default {
    getAllUsers,
    getUserById,
    getUserByName,
    saveUser,
};
