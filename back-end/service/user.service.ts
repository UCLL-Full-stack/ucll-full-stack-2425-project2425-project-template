import { User } from "../model/user";
import userDb from "../repository/user.db";
import bestellingDb from "../repository/bestelling.db";
import { Bestelling } from "../model/bestelling";
import { AuthenticationResponse, UserInput } from "../types";
import bcrypt from 'bcrypt';
import { generateJwtToken } from "../util/jwt";

const createUser = async (user: User): Promise<User> => {
    user.register();
    userDb.createUser(user);
    return user;
}

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

const getUserByUsername = async ({ gebruikersnaam }: { gebruikersnaam: string }): Promise<User> => {
    const user = await userDb.getUserByUsername({ gebruikersnaam });
    if (!user) {
        throw new Error(`User with username: ${gebruikersnaam} does not exist.`);
    }
    return user;
};

const authenticate = async ({ gebruikersnaam, wachtwoord }: { gebruikersnaam: string, wachtwoord: string }): Promise<AuthenticationResponse> => {
    const user = await getUserByUsername({ gebruikersnaam });

    const isValidPassword = await bcrypt.compare(wachtwoord, user.getWachtwoord());

    if (!isValidPassword) {
        throw new Error('Incorrect password.');
    }
    return {
        token: generateJwtToken({ gebruikersnaam, rol: user.getRol() }),
        gebruikersnaam: gebruikersnaam,
        volledigenaam: `${user.getVoornaam()} ${user.getNaam()}`,
        rol: user.getRol(),
    };
};

export default {
    createUser,
    getAllUsers,
    getUserById,
    getUserBestellingen,
    getUserByUsername,
    authenticate
}