
import { PrismaClient } from "@prisma/client";
import { User } from "../domain/model/user";
import { UserInput } from "../types";
import bcrypt from "bcrypt";
import { generateToken } from "../types/util/token";
import userDb from "../repository/user.db";
const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});

const getAllUsers = async (): Promise<User[]> => userDb.getAllUsers();


const getUserById = async (id: number) => {
    const user = await userDb.getUserById({ id });
    if (!user) throw new Error(`Lecturer with id ${id} does not exist.`);
    return user;
}

// const signupUser = async (email: string, name: string, password: string, phoneNumber: string) => {

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = await prisma.user.create({
//         data: {
//             email: email,
//             name: name,
//             password: hashedPassword,
//             phoneNumber: phoneNumber
//         }
//     })
//     // return generateToken({ id: newUser.id, email: newUser.email });
//     return await prisma.user.findMany()
// };



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

export default { getAllUsers, getUserById };