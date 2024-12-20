import { error } from "console";
import { User } from "../model/user";
import database from "../repository/database";
import userDb from "../repository/user.db";
import { AuthenticationResponse, UserInput } from "../types";
import bcrypt from 'bcrypt';
import { generateJWTtoken } from '../util/jwt';
import cartService from "./cart.service";
import { Cart } from "../model/cart";


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
    
    const existingUserByEmail = await userDb.getUserByEmail(email);
    if (existingUserByEmail) {
        throw new Error(`User with email ${email} is already registered.`);
    }

    const existingUserByPhoneNumber = await userDb.getUserByPhoneNumber(phone_number);
    if (existingUserByPhoneNumber) {
        throw new Error(`User with phone number ${phone_number} is already registered.`);
    }

    const hashedPassword : string = await bcrypt.hash(password, 12);
    const user = new User({name,email,password : hashedPassword,role,birth_date,phone_number});
    const createdUser = await userDb.createUser(user);

    const cart = new Cart({
        products: [],
        user: createdUser,
    });
    await cartService.createCart(cart);

    return createdUser;


}


const authenticate = async({email,password}: UserInput): Promise<AuthenticationResponse> => {
    if (!email) {
        throw new Error("Email cannot be empty");
    }
    const user = await userDb.getUserByEmail(email);

    if (!user) {
        throw new Error("User not found");
    }

    if (!password) {
        throw new Error("Password cannot be empty")
    }
    const isValidPassword = await bcrypt.compare(password, user.getPassword());

    if (!isValidPassword) {
        throw new Error('Incorrect password');
    }
    return {
        token: generateJWTtoken({ email, role: user.getRole() }),
        email: email,
        fullname: `${user.getName()}`
    };
}

const getUserByEmail = async(email : string): Promise<User | null> => {
    const user = userDb.getUserByEmail(email);
    if(!user){
        throw new Error('user not found')
    }
    return userDb.getUserByEmail(email);
}

export default {
    createUser,
    authenticate,
    getUserByEmail
}