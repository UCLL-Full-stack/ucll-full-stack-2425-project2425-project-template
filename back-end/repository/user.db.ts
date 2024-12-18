import { Caretaker } from '../model/caretaker';
import { User } from '../model/user';
import database from './database';

const getAllUsers = async (): Promise<User[]> => {
    try {
        const userPrisma = await database.user.findMany();
        return userPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserByUsername = async ({ username }: { username: string }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findFirst({
            where: { username },
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserById = async ({ id }: { id: number }): Promise<User | null> => {
    try {
        const UserPrisma = await database.user.findUnique({
            where: { id },
        });
        return UserPrisma ? User.from(UserPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const deleteUser = async ({ username }: { username: string }) => {
    try {
        const user = await getUserByUsername({ username });
        if (!user) {
            throw new Error(`User with username: ${username} does not exist.`);
        }
        if (user.isAdmin()) {
            throw new Error('Unable to delete a user with admin permissions.');
        }

        if (user.isCaretaker()) {
            const caretaker = await database.caretaker.findUnique({
                where: { userId: user.getId() },
                include: { animals: true },
            });

            if (caretaker?.animals.length) {
                const animalNames = caretaker.animals.map((animal) => animal.name).join(', ');
                throw new Error(
                    `Please assign a different caretaker for the following animals: ${animalNames}`
                );
            }
        }

        await database.user.delete({
            where: { username },
        });
    } catch (error) {
        console.error(error);
        throw new Error(String(error));
    }
};

const getAllCaretakers = async (): Promise<Caretaker[]> => {
    try {
        const userPrisma = await database.caretaker.findMany({
            include: { user: true },
        });
        return userPrisma.map((userPrisma) => Caretaker.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllUsers,
    getUserByUsername,
    getUserById,
    deleteUser,
    getAllCaretakers,
};
