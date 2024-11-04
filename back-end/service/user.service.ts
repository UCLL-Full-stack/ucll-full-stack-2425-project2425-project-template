import userDb from '../repository/user.db';
import { User } from '../model/user';
import { AccountInput, UserInput } from '../types/index';
import { Account } from '../model/account';
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
    return userDb.getUserByEmailAndPassword(email, password);
};

const getUserByEmail = (email: string): User | undefined => {
    const user = userDb.getUserByEmail(email);
    if (!user) {
        throw new Error(`User with email ${email} not found.`);
    }
    return userDb.getUserByEmail(email);
};

const getUserByNationalRegisterNumber = (nationalRegisterNumber: string): User | undefined => {
    const user = userDb.getUserByNationalRegisterNumber(nationalRegisterNumber);
    if (!user) {
        throw new Error(`User with national register number ${nationalRegisterNumber} not found.`);
    }
    return userDb.getUserByNationalRegisterNumber(nationalRegisterNumber);
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

export default {
    createUser,
    getUserByEmailAndPassword,
    getUserByEmail,
    getUserByNationalRegisterNumber,
    addAccount,
};
