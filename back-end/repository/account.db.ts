import { get } from 'http';
import { Account } from '../model/account';
import { Transaction } from '../model/transaction';
import { User } from '../model/user';

const accounts: Account[] = [
    new Account({
        isShared: false,
        type: 'Savings',
        users: [
            new User({
                nationalRegisterNumber: '99.01.01-123.45', // Example valid NRN
                name: 'John Doe',
                birthDate: new Date('1990-01-01'),
                isAdministrator: false,
                phoneNumber: '+32 12 34 56 78',
                email: 'john.doe@example.com',
                password: 'P@ssw0rd!',
            }),
        ],
    }),
];

const createAccount = ({
    isShared,
    type,
    users,
}: {
    isShared: boolean;
    type: string;
    users: User[];
}): Account => {
    const account = new Account({ isShared, type, users });
    users.forEach((user) => {
        user.accounts.push(account);
    });
    accounts.push(account);
    return account;
};

const getAccountById = ({ id }: { id: number }): Account | null => {
    const account = accounts.find((a) => a.getId() === id);
    return account ? account : null;
};

export default { createAccount, getAccountById };
