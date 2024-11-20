import userDB from "../repository/user.db";
import { User } from "../model/user";
import { UserInput } from "../types";

const getAllUsers = async (): Promise<User[]> => userDB.getAllUsers();



export default { getAllUsers };