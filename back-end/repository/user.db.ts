import { User } from '../model/user';

const users = [
    new User({ email: 'john.doe@mail.com', password: 'John123!', role: 'user' }),
    new User({ email: 'jane.doe@mail.com', password: 'Jane123!', role: 'user' }),
];

const getAll = (): User[] => {
    try {
        return users;
    } catch (error) {
        console.log(error);
        throw new Error('Could not get all users');
    }
};

export default {
    getAll,
};
