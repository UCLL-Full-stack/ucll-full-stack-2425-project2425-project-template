import bcrypt from 'bcrypt';
import { User } from '../model/user';
import database from '../util/database';

const getUserByUsername = async ({ username }: { username: string }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { username }
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createUser = async ({ user }: { user: User }): Promise<User> => {
    try {
        const hashedPassword = await bcrypt.hash(user.getPassword(), 10);
        const userPrisma = await database.user.create({
            data: {
                username: user.getUsername(),
                password: hashedPassword,
                name: user.getName(),
                surname: user.getSurname(),
                email: user.getEmail(),
                permission: user.getPermission(),
            },
            include: {
                submissions: true,
            },
        });

        return User.from(userPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getUserByUsername,
    createUser,
};