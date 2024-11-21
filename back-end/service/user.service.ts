import { User } from "../model/user";
import userDb from "../repository/user.db";
import bestellingDb from "../repository/bestelling.db";
import { Bestelling } from "../model/bestelling";

const createUser = async (user: User): Promise<User> => {
    user.register();
    userDb.createUser(user);
    return user;
};

const getAllUsers = async (): Promise<User[]> => userDb.getAllUsers();

const getUserById = async (id: number): Promise<User | null> => {
    const user = userDb.getUserById({ id: id });
    if (!user) {
        throw new Error(`User with id ${id} does not exist.`);
    } else {
        return user;
    }
}

const getUserBestellingen = async (id: number): Promise<Bestelling[]> => {
    const user = await userDb.getUserById({ id: id });
    if (!user) {
        throw new Error(`User with id ${id} does not exist.`);
    }
    const bestellingen = await bestellingDb.getBestellingenByUser({ id: id });
    return bestellingen;
}

export default {
    createUser,
    getAllUsers,
    getUserById,
    getUserBestellingen
}