import { User } from "../model/user";
import database from "../repository/database";
import userDb from "../repository/user.db";
import { UserInput } from "../types";
import bcrypt from 'bcrypt';

const createUser = async ({name,email,password,role,birth_date,phone_number}:UserInput): Promise<User> => {
    const existingUser = await userDb.getUserByUsername({ email });

    if (existingUser){
        throw new Error(`User with email ${email} is already registered.`);
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({name,email,hashedPassword,role,birth_date,phone_number})
    return await userDb.createUser(user);

}
export default {
    createUser,
}