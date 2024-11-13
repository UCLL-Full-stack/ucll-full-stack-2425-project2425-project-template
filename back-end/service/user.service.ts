import userDb from '../repository/user.db';
import { User } from '../model/user';
import { UserInput } from '../types/index';
import accountService from './account.service';

const createUser = ({
    nationalRegisterNumber,
    name,
    birthDate,
    isAdministrator,
    phoneNumber,
    email,
    password,
}: UserInput): User => {
    const existingUser = userDb.getUserByNationalRegisterNumber(nationalRegisterNumber);
    if (existingUser) {
        throw new Error(
            `User with national register number ${nationalRegisterNumber} already exists.`
        );
    }
    const user = new User({
        nationalRegisterNumber,
        name,
        birthDate,
        isAdministrator,
        phoneNumber,
        email,
        password,
    });
    return userDb.createUser(user);
};

const getUserByEmailAndPassword = (email: string, password: string): User | undefined => {
    const user = userDb.getUserByEmailAndPassword(email, password);
    if (!user) {
        throw new Error('Invalid email or password.');
    }
    return user;
};

const getUserByEmail = (email: string): User | undefined => {
    const user = userDb.getUserByEmail(email);
    if (!user) {
        throw new Error(`User with email ${email} not found.`);
    }
    return user;
};

const getUserByNationalRegisterNumber = (nationalRegisterNumber: string): User | undefined => {
    const user = userDb.getUserByNationalRegisterNumber(nationalRegisterNumber);
    if (!user) {
        throw new Error(`User with national register number ${nationalRegisterNumber} not found.`);
    }
    return user;
};

const addAccount = (nationalRegisterNumber: string, accountNumber: string): User => {
    const user = getUserByNationalRegisterNumber(nationalRegisterNumber);
    const account = accountService.getAccountByAccountNumber(accountNumber);
    if (!user) {
        throw new Error(`User with national register number ${nationalRegisterNumber} not found.`);
    }
    if (!account) {
        throw new Error(`Account with account number ${accountNumber} not found.`);
    }
    user.addAccount(account);
    account.addUser(user);
    return user;
};

const updateUser = async (
    nationalRegisterNumber: string,
    userInput: Partial<UserInput>
): Promise<User> => {
    const user = await userDb.getUserByNationalRegisterNumber(nationalRegisterNumber);
    if (!user) {
        throw new Error(`User with national register number ${nationalRegisterNumber} not found.`);
    }
    user.update(userInput);
    await userDb.updateUser(user);
    return user;
};

const deleteUser = async (nationalRegisterNumber: string): Promise<String> => {
    const user = await userDb.getUserByNationalRegisterNumber(nationalRegisterNumber);
    if (!user) {
        throw new Error(`User with national register number ${nationalRegisterNumber} not found.`);
    } else if (user.getAccounts().length > 0) {
        throw new Error(
            `User with national register number ${nationalRegisterNumber} still has active bank accounts.` // need to change when account status is implemented
        );
    }
    await userDb.deleteUser(nationalRegisterNumber);
    return 'User deleted successfully.';
};

export default {
    createUser,
    getUserByEmailAndPassword,
    getUserByEmail,
    getUserByNationalRegisterNumber,
    addAccount,
    updateUser,
    deleteUser,
};
