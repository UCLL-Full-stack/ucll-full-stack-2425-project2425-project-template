import database from '../repository/database';
import { Account } from '../model/account';
import { User } from '../model/user';
import prisma from '../repository/database';

export const createAccount = async (bio: string, userId: number) =>  {
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    if (!user) {
        throw new Error('User not found');
    }

    const account = await prisma.account.create({
        data: {
            bio,
            userId,
        },
        include: {
            user: true,
        },
    });

    return account;
};
