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

const getUserByName = (name: string): User => {
    const user = userRepository.getUserByName(name);
    if (!user) {
        throw new Error(`User with name ${name} does not exist.`);
    }
    return user;
};

const createUser = (userData: { name: string; password: string; role: Role }): User => {
    return userRepository.saveUser(userData);
};

export default {
    getAllUsers,
    getUserById,
    getUserByName,
    createUser,
};
