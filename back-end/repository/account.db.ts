import {Account} from '../model/account';
import {User} from '../model/user';

const accounts: Account[] = [
    new Account({
        id: 1,
        bio: 'Hi, I am an admin',
        user: new User({
            id: 1,
            username: 'admin',
            email: 'admin@ucll.be',
            password: 'admin',
        }),
    }),
];

const createAccount = ({id, bio, user}: {id: number; bio: string; user: User;}): Account => {
    const account = new Account({
        id,
        bio,
        user: new User({
            id: user.getId(),
            username: user.getUsername(),
            email: user.getEmail(),
            password: user.getPassword(),
        }),
    });
    accounts.push(account);
    return account;
};

export default{createAccount}