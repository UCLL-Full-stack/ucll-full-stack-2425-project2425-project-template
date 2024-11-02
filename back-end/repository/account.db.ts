import { get } from 'http';
import { Account } from '../model/account';
import { Transaction } from '../model/transaction';
import { User } from '../model/user';
import { Budgetgoal } from '../model/budgetgoal';

const accounts: Account[] = [];

const createAccount = ({ isShared, type, users }: Account): Account => {
    const account = new Account({ isShared, type, users });
    accounts.push(account);
    return account;
};

export default { createAccount };
