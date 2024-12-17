import accountDb from '../repository/account.db';
import { Account } from '../model/account';
import { AccountInput } from '../types/index';
import userDb from '../repository/user.db';

const createAccount = async (accountInput: AccountInput): Promise<Account> => {
    // const { isShared, type } = accountInput;
    // const account = new Account({ isShared, type });
    // return accountDb.createAccount(account);

    const account = new Account({ isShared: accountInput.isShared, type: accountInput.type });
    return await accountDb.createAccount(account);
};

const getAccountById = async ({ id }: { id: number }): Promise<Account> => {
    const account = await accountDb.getAccountById({ id });

    if (account === null) {
        throw new Error(`Account with id: ${id} was not found.`);
    }

    return account;
};

const getAccountByAccountNumber = async (accountNumber: string): Promise<Account> => {
    const account = await accountDb.getAccountByAccountNumber(accountNumber);

    if (account == null) {
        throw new Error(`Account with account number: ${accountNumber} was not found.`);
    }

    return account;
};

const getAccountsOfUser = async (email: string): Promise<Account[]> => {
    const user = await userDb.getUserByEmail(email);
    const accountsOfUser = user.getAccounts();
    
    if (user == null) {
        throw new Error('No user was found.')
    }

    if (user.getIsAdministrator() === true) {
        return accountsOfUser;    
    } else {
        return accountsOfUser.filter((account) => account.getType() === 'transaction');
    }
};

export default { createAccount, getAccountById, getAccountByAccountNumber, getAccountsOfUser };
