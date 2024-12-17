import { error } from "console";
import { User } from "../model/user";
import database from "../repository/database";
import userDb from "../repository/user.db";
import { UserInput } from "../types";
import bcrypt from 'bcrypt';


const createUser = async ({name,email,password,role,birth_date,phone_number}: UserInput): Promise<User> => {
    if (!name) {
        throw new Error("Name is required");
    }
    if (!email) {
        throw new Error("Email is required")
    }
    if (!role) {
        throw new Error("Role is required")
    }
    if (!birth_date) {
        throw new Error("Birth date is required")
    }
    if (!phone_number) {
        throw new Error("Phone number is required")
    }
    if (!password) {
        throw new Error("Password is required")
    }
    
    // const existingUser = await userDb.getUserByUsername({ email });

    // if (existingUser){
    //     throw new Error(`User with email ${email} is already registered.`);

    const hashedPassword : string = await bcrypt.hash(password, 12);
    const user = new User({name,email,password : hashedPassword,role,birth_date,phone_number});
    const createdUser = await userDb.createUser(user);
    return createdUser;

}
export default {
    createUser,
}