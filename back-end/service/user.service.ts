import { User } from "../model/user";
import userDb from "../repository/user.db";
import bestellingDb from "../repository/bestelling.db";
import { Bestelling } from "../model/bestelling";
import { AuthenticationResponse, UserInput } from "../types";
import bcrypt from 'bcrypt';
import { generateJwtToken } from "../util/jwt";

const createUser = async (user: User): Promise<User> => {
    const getUsername = await userDb.getUserByUsername({ gebruikersnaam: user.getGebruikersnaam() });

    if (getUsername != null) {
        throw new Error("User already exist");
    }

    const bcryptPassword = await bcrypt.hash(user.getWachtwoord(), 12);
    const newUser = new User({ naam: user.getNaam(), voornaam: user.getVoornaam(), email: user.getEmail(), wachtwoord: bcryptPassword, adres: user.getAdres(), gebruikersnaam: user.getGebruikersnaam(), rol: user.getRol() });
    userDb.createUser(newUser);
    return newUser;
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

const authenticate = async ({ gebruikersnaam, wachtwoord }: UserInput): Promise<AuthenticationResponse> => {
    const user = await getUserByUsername({ gebruikersnaam });

    const isValidPassword = await bcrypt.compare(wachtwoord, user.getWachtwoord());
    console.log(user.getWachtwoord());
    console.log(wachtwoord);

    if (!isValidPassword) {
        throw new Error('Incorrect credentials.');
    }

    const userId = user.getId();
    if (!userId) {
        throw new Error("ID is undefined");
    }

    return {
        token: generateJwtToken({ gebruikersnaam, rol: user.getRol(), id: userId }),
        id: userId,
        gebruikersnaam: gebruikersnaam,
        volledigenaam: `${user.getVoornaam()} ${user.getNaam()}`,
        rol: user.getRol(),
    };
};

const deleteUser = async (id: number): Promise<void> => {
    const user = await userDb.getUserById({ id });
    if (!user) {
        throw new Error(`User with id ${id} does not exist.`);
    }
    await userDb.deleteUser({ id});
}

const updateUser = async (id: number, userData: Partial<User>): Promise<User> => {
    const user = await userDb.getUserById({ id });
    if (!user) {
        throw new Error(`User with id ${id} does not exist.`);
    }
    const updatedUser = await userDb.updateUser(id, userData);
    return updatedUser;
};

export default {
    createUser,
    getAllUsers,
    getUserById,
    getUserBestellingen,
    getUserByUsername,
    authenticate,
    deleteUser,
    updateUser
}