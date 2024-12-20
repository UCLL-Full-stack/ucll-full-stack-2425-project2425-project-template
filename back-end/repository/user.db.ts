import { User } from '../model/user';
import database from '../util/database';

const getAllUsers = async (): Promise<User[]> => {
    try {
        const userPrisma = await database.user.findMany();
        return userPrisma.map((user) => User.from(user));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserById = async ({ id }: { id: string }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { id },
        });
        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserByEmail = async ({ email }: { email: string }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { email },
        });
        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createUser = async (user: User): Promise<User> => {
    try {
        const userPrisma = await database.user.create({
            data: {
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password,
                role: user.role,
            },
        });
        return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAllTrainers = async (): Promise<User[]> => {
    try {
        const trainers = await database.user.findMany({
            where: { role: 'trainer' },
        });
        return trainers.map((trainer) => User.from(trainer));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const promoteToTrainer = async ({ id }: { id: string }): Promise<User> => {
    try {
        const updatedUser = await database.user.update({
            where: { id },
            data: { role: 'trainer' },
        });
        return User.from(updatedUser);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const updateUserRole = async ({ id, role }: { id: string; role: string }): Promise<User> => {
    try {
        const updatedUser = await database.user.update({
            where: { id },
            data: { role },
        });
        return User.from(updatedUser); 
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};



export default { getAllUsers, getUserById, getUserByEmail, createUser, getAllTrainers, promoteToTrainer, updateUserRole };
