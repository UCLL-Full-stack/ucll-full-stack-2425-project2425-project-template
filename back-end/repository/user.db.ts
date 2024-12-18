import { User } from "../model/user";
import database from "./database";

const createUser = async ({name,email,password,role,birth_date,phone_number} : User): Promise<User> => {
    try {
        const userPrisma = await database.user.create({
            data: {
                name,
                email,
                password,
                role,
                birth_date,
                phone_number
            }
        });
        return User.from(userPrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error, See server log for details');
    }
}

const getUserByEmail = async (email: string): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findFirst({
            where: { email }
        });
        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.log(error);
        throw new Error('Database error, See server log for details');
    }
}

const getUserByPhoneNumber = async (phone_number: string): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findFirst({
            where: { phone_number }
        });
        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.log(error);
        throw new Error('Database error, See server log for details');
    }
}

export default{
    createUser,
    getUserByEmail,
    getUserByPhoneNumber,
}