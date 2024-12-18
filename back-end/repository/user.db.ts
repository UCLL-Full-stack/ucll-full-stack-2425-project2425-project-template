import { Caretaker } from '../model/caretaker';
import { Manager } from '../model/manager';
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

const createUser = async (user: User): Promise<User> => {
    try {
        const UserPrisma = await database.user.create({
            data: {
                username: user.getUsername(),
                password: user.getPassword(),
                role: user.getRole(),
            },
        });
        return User.from(UserPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

// Create Manager
const createManager = async (manager: Manager, createdUser: User): Promise<Manager> => {
    try {
        const userId = createdUser.getId()  // Get the user ID
        console.log('User ID when creating manager:', userId); // Log userId to check if it's valid

        if (!userId) {
            throw new Error('User ID is missing when creating Manager.');
        }

        // Connect the Manager to the User using the ID
        const managerPrisma = await database.manager.create({
            data: {
                user: { connect: { id: userId } },  // Use the user ID here
                name: manager.getName(),
            },
            include: { user: true },
        });

        return Manager.from(managerPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};


// Create Caretaker
const createCaretaker = async (caretaker: Caretaker, createdUser: User): Promise<Caretaker> => {
    try {
        const userId = createdUser.getId(); // Get the user ID
        if (!userId) {
            throw new Error('User ID is missing when creating Caretaker.');
        }

        // Connect the Caretaker to the User using the ID
        const caretakerPrisma = await database.caretaker.create({
            data: {
                user: { connect: { id: userId } }, // Use the user ID here
                name: caretaker.getName(),
            },
            include: { user: true },
        });

        return Caretaker.from(caretakerPrisma);
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
    createUser,
    createCaretaker,
    createManager,
};
