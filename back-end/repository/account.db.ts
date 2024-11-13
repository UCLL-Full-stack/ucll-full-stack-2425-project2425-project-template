import { Account } from '../model/account';

const accounts: Account[] = [];

const createAccount = ({ isShared, type }: { isShared: boolean; type: string }): Account => {
    const account = new Account({ isShared, type });
    accounts.push(account);
    return account;
};

const getAccountById = ({ id }: { id: number }): Account | null => {
    const account = accounts.find((a) => a.getId() === id);
    return account ? account : null;
};

const getAccountByAccountNumber = (accountNumber: string): Account | undefined => {
    return accounts.find((account) => account.getAccountNumber() === accountNumber);
};

export default { createAccount, getAccountById, getAccountByAccountNumber };
