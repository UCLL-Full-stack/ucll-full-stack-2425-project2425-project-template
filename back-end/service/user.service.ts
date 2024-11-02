// src/service/userService.ts
import { User } from '../model/user';
import userRepository from '../repository/user.db';
import { Role } from '../types';

const getAllUsers = (): User[] => {
    return userRepository.getAllUsers();
};

const getUserById = (id: number): User => {
    const user = userRepository.getUserById(id);
    if (!user) {
        throw new Error(`User with id ${id} does not exist.`);
    }
    return user;
};

const getUserByFirstName = (firstName: string): User => {
    const user = userRepository.getUserByFirstName(firstName);
    if (!user) {
        throw new Error(`User with first name ${firstName} does not exist.`);
    }
    return user;
};

const getUserByLastName = (lastName: string): User => {
    const user = userRepository.getUserByLastName(lastName);
    if (!user) {
        throw new Error(`User with last name ${lastName} does not exist.`);
    }
    return user;
};

const getUserByEmail = (email: string): User => {
    const user = userRepository.getUserByEmail(email);
    if (!user) {
        throw new Error(`User with email ${email} does not exist.`);
    }
    return user;
};

const createUser = (userData: { firstName: string; lastName: string; email: string; password: string; role: Role }): User => {
    return userRepository.saveUser(userData);
};

export default {
    getAllUsers,
    getUserById,
    getUserByFirstName,
    getUserByLastName,
    getUserByEmail,
    createUser,
};
