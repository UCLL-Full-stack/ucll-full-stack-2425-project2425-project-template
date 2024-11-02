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

// Function to retrieve a user by firstname
const getUserByFirstName = (firstName: string): User | null => {
    console.log("Searching for user with firstName:", firstName);
    const user = users.find((user) => user.getFirstName() === firstName);
    console.log("Found user:", user);
    return user || null;
};
// Function to retrieve a user by lastname
const getUserByLastName = (lastName: string): User | null => {
    const user = users.find((user) => user.getLastName() === lastName);
    return user || null;
};
// Function to retrieve a user by email
const getUserByEmail = (email: string): User | null => {
    const user = users.find((user) => user.getEmail() === email);
    return user || null;
};

// Function to save a new user
const saveUser = (userData: { firstName: string; lastName: string; email: string; password: string; role: Role }): User => {
    const newUser = new User({ id: users.length + 1, ...userData });
    users.push(newUser);
    return newUser;
};

// Export the repository functions as an object for easy import
export default {
    getAllUsers,
    getUserById,
    getUserByFirstName,
    getUserByLastName,
    getUserByEmail,
    saveUser,
};
