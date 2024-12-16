
import { PrismaClient } from "@prisma/client";
import { User } from "../domain/model/user";
import { UserInput } from "../types";
import bcrypt from "bcrypt";
import { generateToken } from "../types/util/token";

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

const getAllUsers = async () => {
    try {
        const cars = await prisma.user.findMany();
        return cars;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
};

const signupUser = async (email : string , name : string, password : string, phoneNumber : string) => {
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
        data: {
            email: email, 
            name: name,
            password: hashedPassword,
            phoneNumber: phoneNumber
        }
    })
    // return generateToken({ id: newUser.id, email: newUser.email });
    return await prisma.user.findMany()
  };


  
//   export const loginUser = async (email: string, password: string): Promise<string> => {
//     const user = await findUserByEmail(email);
//     if (!user) {
//       throw new Error("User not found.");
//     }
  
//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       throw new Error("Invalid credentials.");
//     }
  
//     return generateToken({ id: user.id, email: user.email });
//   };

export default { getAllUsers, signupUser };