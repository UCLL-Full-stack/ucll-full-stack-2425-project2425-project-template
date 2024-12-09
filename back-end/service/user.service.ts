import { get } from "http";
import { User } from "../model/User";
import userDB from "../repository/user.db";

const getAllUsers = async (): Promise<User[]> => userDB.getAllUsers();

const getAllPlayers = async (): Promise<User[]> => userDB.getAllPlayers();

const getAllCoaches = async (): Promise<User[]> => userDB.getAllCoaches();

const getAllAdmins = async (): Promise<User[]> => userDB.getAllAdmins();

const getUserById = async (userId: number): Promise<User> => userDB.getUserById(userId);

export default {
    getAllUsers, getAllPlayers, getAllCoaches, getUserById, getAllAdmins
}