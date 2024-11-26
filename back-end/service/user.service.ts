import userDb from '../repository/user.db';
import { User } from '../model/user';
import { UserInput } from '../types/index';
import accountService from './account.service';

const createUser = async (userInput: UserInput): Promise<User> => {
    const existingUser = await userDb.getUserByNationalRegisterNumber(userInput.email);
    
    if (existingUser == null) {
        throw new Error(
            `User with national register number ${userInput.nationalRegisterNumber} already exists.`
        );
    }

    // const hashedPasswd = await bcrypt.hash(userInput.password, 12);

    const newUser = new User({
        nationalRegisterNumber: userInput.nationalRegisterNumber,
        name: userInput.name,
        birthDate: userInput.birthDate,
        isAdministrator: userInput.isAdministrator,
        phoneNumber: userInput.phoneNumber,
        email: userInput.email,
        password: userInput.password,
    });

    return await userDb.createUser(newUser);
};

// Dit word authenticate functie
const getUserByEmailAndPassword = async (email: string, password: string): User | undefined => {
    const user = userDb.getUserByEmailAndPassword(email, password);
    if (!user) {
        throw new Error('Invalid email or password.');
    }
    return user;
};

const getUserByEmail = async (email: string): Promise<User> => {
    const user = await userDb.getUserByEmail(email);
    
    if (user == null) {
        throw new Error(`User with email ${email} not found.`);
    }

    return user;
};

const getUserByNationalRegisterNumber = async (nationalRegisterNumber: string): Promise<User> => {
    const user = await userDb.getUserByNationalRegisterNumber(nationalRegisterNumber);
    
    if (user == null) {
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

const updateUser = async (updatedUser: UserInput): Promise<User> => {
    const user = await userDb.getUserByEmail(updatedUser.email);
    
    if (user == null) {
        throw new Error(`User with national register number ${updatedUser.nationalRegisterNumber} not found.`);
    }

    return await userDb.updateUser(user);
};

const deleteUser = async (nationalRegisterNumber: string): Promise<User> => {
    const user = await userDb.getUserByNationalRegisterNumber(nationalRegisterNumber);
    
    if (user == null) {
        throw new Error(`User with national register number ${nationalRegisterNumber} not found.`);
    } else if (user.getAccounts().length > 0) {
        throw new Error(
            `User with national register number ${nationalRegisterNumber} still has active bank accounts.` // need to change when account status is implemented
        );
    }

    // await userDb.deleteUser(nationalRegisterNumber);
    // return 'User deleted successfully.';
    return await userDb.deleteUser(nationalRegisterNumber);
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
