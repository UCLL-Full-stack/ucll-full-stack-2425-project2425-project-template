import accountDb from '../repository/account.db';
import { Account } from '../model/account';
import { AccountInput, UserInput } from '../types/index';

const createAccount = (accountInput: AccountInput): Account => {
    const { isShared, type } = accountInput;
    const account = new Account({ isShared, type });
    return accountDb.createAccount(account);
};

const getAccountById = ({ id }: { id: number }): Account => {
    const account = accountDb.getAccountById({ id });
    if (account === null) {
        throw new Error(`Account with id: ${id} was not found.`);
    }

    return account;
};

const getAccountByAccountNumber = (accountNumber: string): Account | undefined => {
    const account = accountDb.getAccountByAccountNumber(accountNumber);
    if (!account) {
        throw new Error(`Account with account number: ${accountNumber} was not found.`);
    }

    return account;
};

export default { createAccount, getAccountById, getAccountByAccountNumber };
