import { User } from "../model/user";
import userDb from "../repository/user.db";
import { UserInput } from "../types/types";
import bcrypt from 'bcrypt';


const getAllUsers = async (): Promise<User[]> => userDb.getAllUsers();

const createUser = async ({email, password, role}: UserInput): Promise<User> => { 
    const existingUser = await userDb.findUserByEmail(email);

    if (existingUser) {
        throw new Error(`User with email ${email} already exists`);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({email, password: hashedPassword, role});

    return await userDb.createUser(user);
   
}
export default {
    getAllUsers, createUser
}