import { User } from "../model/user";
import {Event} from "../model/event";
import userDb from "../repository/user.db"
import { AuthenticationResponse, Role, UserInput } from "../types";
import bcrypt, { hash } from 'bcrypt';
import jwt from 'jsonwebtoken';

const getAllUsers = async (): Promise<User[]> => {
    return userDb.getAllUsers();
};

const getUserById = async (id: number): Promise<User | null> => {
    return userDb.getUserById({ id });
};

const getUserByEmail = async (email: string): Promise<User> => {
    const user = await userDb.getUserByEmail(email);

    if (user === null){
        throw new Error("User does not exist.");
    }

    return user;
};

const createUser = async (user: UserInput): Promise<User> => {
    const userExisted = await userDb.getUserByEmail(user.email);

    if (userExisted !== null){
        throw new Error("User already exists.");
    }

    const hashedPass = await bcrypt.hash(user.password, 12);

    const newUser = new User({
            username: user.username,
            name: user.name,
            email: user.email,
            password: hashedPass,
            age: user.age,
            role: user.role,
            events: [],
    });

    return await userDb.createUser(newUser);
}

const addEventToFavorite = async (email: string, eventId: number): Promise<void> => {
    const user = await userDb.getUserByEmail(email);

    if (user === null){
        throw new Error("User does not exist.");
    }

    return await userDb.addEventToFavorite(user, eventId);
}

//log-in authentication
const authentication = async ({email, password}: UserInput): Promise<AuthenticationResponse> => {
    const user  = await userDb.getUserByEmail(email);

    if (!user) {
        throw new Error('User does not exist.');
    }

    const result = await bcrypt.compare(password, user.getPassword());

    if (!result){
        throw new Error('Incorrect username or password');
    }

    return {
        token: generateJwtToken(user.getUsername(), user.getRole()),
        email: user.getEmail(),
        username: user.getUsername(),
        name: user.getName(),
        role: user.getRole(),
    }
}

const generateJwtToken = (username: string, role: Role) => {
    const options = {expiresIn: `${process.env.JWT_EXPIRES_HOURS}h`, issuer: 'eventora'};

    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET is not defined');
        }
        return jwt.sign({username, role}, process.env.JWT_SECRET, options);
    } catch (error) {
        throw new Error('Error generating JWT token, see server log for details.');
    }
};

const getFavoriteEventsByUserEmail = async (email: string): Promise<Event[]> => {
    return userDb.getFavoriteEventsByUserEmail(email);
}

export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
    createUser,
    addEventToFavorite,
    authentication,
    getFavoriteEventsByUserEmail,
}