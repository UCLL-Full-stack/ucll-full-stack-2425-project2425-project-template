import { Subscription } from '../model/subscription';
import { User } from '../model/user';
import database from '../util/database';

const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany();
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserById = async ({ id }: { id: number }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { id },
            include: { subscription: true },
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserByUsername = async ({ username }: { username: string }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findFirst({
            where: { username },
            include: { subscription: true },
            
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createUser = async (items: User): Promise<User> => {
    try {
        const userPrisma = await database.user.create ({
            data: {
                username: items.getUsername(),
                firstName: items.getFirstName(),
                lastName: items.getLastName(),
                email: items.getEmail(),
                role: items.getRole(),
                password: items.getPassword()
            }
        }) 
        return User.from(userPrisma)
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const changeSubscriptionOfUser = async (subscription: Subscription, userId: number): Promise<User> => {
    try {
       
        const subscriptionPrisma = await database.subscription.upsert({
            where: { userId },
            update: {
                type: subscription.getType(),
                startDate: subscription.getStartDate(),
                duration: subscription.getDuration(),
            },
            create: {
                type: subscription.getType(),
                startDate: subscription.getStartDate(),
                duration: subscription.getDuration(),
                userId: userId, 
            },
        });

        const userPrisma = await database.user.findUnique({
            where: { id: userId },
            include: { subscription: true },
        });

        if (!userPrisma) {
            throw new Error(`User with ID ${userId} not found.`);
        }

        return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};




export default {
    getAllUsers,
    getUserById,
    getUserByUsername,
    createUser,
    changeSubscriptionOfUser
};