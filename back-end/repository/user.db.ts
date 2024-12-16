import { User } from '../model/user';
import { Account } from '../model/account';
import { Income } from '../model/income';
import { Expense } from '../model/expense';
import database from '../util/database';

const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany({ include: { accounts: true } });
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    } catch (error: any) {
        throw new Error('Database error. See server log for details.');
    }
};

const createUser = async (user: User): Promise<User> => {
    const accounts = user.getAccounts();

    try {
        const userPrisma = await database.user.create({
            data: {
                nationalRegisterNumber: user.getNationalRegisterNumber(),
                name: user.getName(),
                birthDate: user.getBirthDate(),
                isAdministrator: user.getIsAdministrator(),
                phoneNumber: user.getPhoneNumber(),
                email: user.getEmail(),
                password: user.getPassword(),
                accounts: {
                    create: accounts.map((account) => ({
                        accountNumber: account.getAccountNumber(),
                        balance: account.getBalance(),
                        isShared: account.getIsShared(),
                        startDate: account.getStartDate(),
                        endDate: account.getEndDate(),
                        status: account.getStatus(),
                        type: account.getType(),
                        expenses: {
                            create: account.getExpenses().map((expense) => ({
                                referenceNumber: expense.getReferenceNumber(),
                                date: expense.getDate(),
                                amount: expense.getAmount(),
                                currency: expense.getCurrency(),
                                sourceAccountId: account.getId(),
                                destinationAccountId: expense.getDestinationAccountId(),
                            })),
                        },
                        incomes: {
                            create: account.getIncomes().map((income) => ({
                                referenceNumber: income.getReferenceNumber(),
                                date: income.getDate(),
                                amount: income.getAmount(),
                                currency: income.getCurrency(),
                                sourceAccountId: account.getId(),
                                destinationAccountId: income.getDestinationAccountId(),
                            })),
                        },
                    })),
                },
            },
            include: { accounts: { include: { expenses: true, incomes: true } } },
        });

        return User.from(userPrisma);
    } catch (error: any) {
        throw new Error('Database error. See server log for details.');
    }
};

const getUserByNationalRegisterNumber = async (
    nationalRegisterNumber: string
): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: {
                nationalRegisterNumber: nationalRegisterNumber,
            },
            include: { accounts: { include: { expenses: true, incomes: true } } },
        });
        if (userPrisma) {
            return User.from(userPrisma);
        } else {
            return null;
        }
    } catch (error: any) {
        throw new Error('Database error. See server log for details.');
    }
};

const getUserByEmail = async (email: string): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: {
                email: email,
            },
            include: { accounts: { include: { expenses: true, incomes: true } } },
        });

        if (userPrisma) {
            return User.from(userPrisma);
        } else {
            return null;
        }
    } catch (error: any) {
        throw new Error('Database error. See server log for details.');
    }
};

const updateUser = async (updatedUser: User): Promise<User> => {
    try {
        const updatedPrisma = await database.user.update({
            where: {
                nationalRegisterNumber: updatedUser.getNationalRegisterNumber(),
            },
            data: {
                nationalRegisterNumber: updatedUser.getNationalRegisterNumber(),
                name: updatedUser.getName(),
                birthDate: updatedUser.getBirthDate(),
                isAdministrator: updatedUser.getIsAdministrator(),
                phoneNumber: updatedUser.getPhoneNumber(),
                email: updatedUser.getEmail(),
                password: updatedUser.getPassword(),
            },
            include: { accounts: { include: { expenses: true, incomes: true } } },
        });

        return User.from(updatedPrisma);
    } catch (error: any) {
        throw new Error('Database error. See server log for details.');
    }
};

const deleteUser = async (nationalRegisterNumber: string): Promise<User> => {
    try {
        const deletedPrisma = await database.user.delete({
            where: {
                nationalRegisterNumber: nationalRegisterNumber,
            },
            include: { accounts: { include: { expenses: true, incomes: true } } },
        });

        return User.from(deletedPrisma);
    } catch (error: any) {
        throw new Error('Database error. See server log for details.');
    }
};

const addAccount = async (nationalRegisterNumber: string, accountNumber: string): Promise<User> => {
    try {
        const updatedUser = await database.user.update({
            where: { nationalRegisterNumber },
            data: {
                accounts: {
                    connect: { accountNumber },
                },
            },
            include: { accounts: { include: { expenses: true, incomes: true } } },
        });
        return User.from(updatedUser);
    } catch (error: any) {
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    createUser,
    getUserByNationalRegisterNumber,
    getUserByEmail,
    getAllUsers,
    updateUser,
    deleteUser,
    addAccount,
};
