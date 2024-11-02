import accountDb from '../repository/account.db';
import userDb from '../repository/user.db';
import { Account } from '../model/account';
import { AccountInput, UserInput } from '../types/index';

const createAccount = ({ isShared, type }: AccountInput): Account => {
    const account = new Account({ isShared, type });
    return accountDb.createAccount(account);
};

export default { createAccount };
