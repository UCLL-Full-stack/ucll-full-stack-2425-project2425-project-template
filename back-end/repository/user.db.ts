import { User } from '../model/user';
import { Account } from '../model/account';
import database from '../util/database';


// const johnDoe = new User({
//     nationalRegisterNumber: '99.01.01-123.45',
//     name: 'John Doe',
//     birthDate: new Date('1990-01-01'),
//     isAdministrator: false,
//     phoneNumber: '+32 12 34 56 78',
//     email: 'john.doe@example.com',
//     password: 'P@ssw0rd!',
//     accounts: [
//         new Account({
//             isShared: false,
//             type: 'Savings',
//         }),
//         new Account({
//             isShared: true,
//             type: 'Transaction',
//         }),
//     ],
// });

// const users: User[] = [johnDoe];

const getAllUsers = async (): Promise<User[]> => {
    try {
        const usersPrisma = await database.user.findMany({ include: { accounts: true }});
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    } catch(error: any) {
        throw new Error("Database error. See server log for details.");
    }
};

// const createUser = ({
//     nationalRegisterNumber,
//     name,
//     birthDate,
//     isAdministrator,
//     phoneNumber,
//     email,
//     password,
// }: User): User => {
//     const user = new User({
//         nationalRegisterNumber,
//         name,
//         birthDate,
//         isAdministrator,
//         phoneNumber,
//         email,
//         password,
//     });
//     users.push(user);
//     return user;
// };

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
                        transactions: {
                            create: account.getTransactions().map((transaction) => ({
                                amount: transaction.getAmount(),
                                currency: transaction.getCurrency(),
                                transactionType: transaction.getTransactionType(),
                                referenceNumber: transaction.getReferenceNumber(),
                                date: transaction.getDate(),
                            })),
                        },
                    })),
                },
            },
            include: { accounts: { include: { transactions: true } } }, 
        });

        return User.from(userPrisma); 
    } catch (error: any) {
        throw new Error('Database error. See server log for details.');
    }
};


const getUserByNationalRegisterNumber = async (nationalRegisterNumber: string): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: {
                nationalRegisterNumber: nationalRegisterNumber,
            }, include: { accounts: { include: { transactions: true } } },
        });
        if (userPrisma) {
            return User.from(userPrisma);
        } else {
            return null;
        } 
    } catch (error: any) {
            throw new Error("Database error. See server log for details.");
        }
};

// DIT IS VOOR LOGIN => BCRYPT en JWT
const getUserByEmailAndPassword = async (email: string, password: string): Promise<User | null> => {
    return users.find((user) => user.getEmail() === email && user.getPassword() === password);
};

const getUserByEmail = async (email: string): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: {
                email: email,
            }, include: { accounts: { include: {transactions: true} } },
        });

        if (userPrisma) {
            return User.from(userPrisma);
        } else {
            return null;
        }
    } catch(error: any) {
        throw new Error("Database error. See server log for details.");
    }
};

const updateUser = async (updatedUser: User): Promise<User> => {
    try {
        const updatedPrisma = await database.user.update({
            where: {
                email: updatedUser.getEmail(),
            },
            data: {
                nationalRegisterNumber: updatedUser.getNationalRegisterNumber(),
                name: updatedUser.getName(),
                birthDate: updatedUser.getBirthDate(),
                isAdministrator: updatedUser.getIsAdministrator(),
                phoneNumber: updatedUser.getPhoneNumber(),
                email: updatedUser.getEmail(),
                password: updatedUser.getPassword(),
            }, include: { accounts: { include: {transactions: true} } },
        });
        
        return User.from(updatedPrisma);
    } catch(error: any) {
        throw new Error("Database error. See server log for details.");
    }
    
    // const index = users.findIndex(
    //     (user) => user.getNationalRegisterNumber() === updatedUser.getNationalRegisterNumber()
    // );
    // if (index !== -1) {
    //     users[index] = updatedUser;
    // }
    // return updatedUser;
};

const deleteUser = async (nationalRegisterNumber: string): Promise<User> => {
    try {
        const deletedPrisma = await database.user.delete({
            where: {
                nationalRegisterNumber: nationalRegisterNumber,
            }, include: { accounts: { include: {transactions: true} } },
        });
        
        // if (deletedPrisma) {
        //     return User.from(deletedPrisma);    
        // } else {
        //     return null;
        // }
        return User.from(deletedPrisma);    
        
    } catch(error: any) {
        throw new Error("Database error. See server log for details.");
    }
    
    // const index = users.findIndex(
    //     (user) => user.getNationalRegisterNumber() === nationalRegisterNumber
    // );
    // if (index !== -1) {
    //     users.splice(index, 1);
    // }
    // return 'User deleted successfully.';
};

export default {
    createUser,
    getUserByNationalRegisterNumber,
    getUserByEmailAndPassword,
    getUserByEmail,
    getAllUsers,
    updateUser,
    deleteUser,
};
