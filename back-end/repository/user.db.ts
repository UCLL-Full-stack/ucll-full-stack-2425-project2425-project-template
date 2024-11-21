import { Rol } from "@prisma/client";
import { User } from "../model/user";
import database from "./database";

const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany({
            include: {
                bestellingen: true,
            },
        });
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createUser = async (user: User) => {
    try {
        const usersPrisma = await database.user.create({
            data: {
                naam: user.getNaam(),
                voornaam: user.getVoornaam(),
                email: user.getEmail(),
                wachtwoord: user.getWachtwoord(),
                adres: user.getAdres(),
                gebruikersnaam: user.getGebruikersnaam(),
                rol: user.getRol() as Rol,
                bestellingen: {
                    connect: user.getBestellingen().map((bestelling) => ({
                        id: bestelling.getId()
                    }))
                }
            }
        });
        return usersPrisma;
    } catch (err) {
        console.error(err);
        throw new Error('Database error. See server logs for details.')
    }
};

const getUserById = async ({ id }: { id: number }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: {
                id: id
            },
            include: {
                bestellingen: { include: { pokebowls: true } }
            }
        });
        if (userPrisma == null) {
            return null;
        }
        return User.from(userPrisma);
    } catch (err) {
        console.error(err);
        throw new Error('Database error. See server logs for details.')
    }
};



export default {
    createUser,
    getAllUsers,
    getUserById
};