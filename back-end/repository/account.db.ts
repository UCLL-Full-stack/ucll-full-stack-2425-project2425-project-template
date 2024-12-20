import {Account} from '../model/account';
import {User} from '../model/user';
import database from './database';

export const createAccount = async ({
    bio,
    userId,
}: {
    bio: string;
    userId: number;
}): Promise<Account> => {
    const user = await database.user.findUnique({ where: { id: userId } });
    if (!user) {
        throw new Error(`User with ID ${userId} not found`);
    }

    const createdAccount = await database.account.create({
        data: {
            bio,
            userId,
        },
        include: { user: true },
    });

    return new Account({
        id: createdAccount.id,
        bio: createdAccount.bio ?? '',
        user: User.from(createdAccount.user),
    });
};

export default{createAccount}