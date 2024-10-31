import { User } from '../model/user';

const users = [
    new User({ id: 0, email: 'john.doe@mail.com', password: 'John123!', role: 'user' }),
    new User({ id: 1, email: 'jane.doe@mail.com', password: 'Jane123!', role: 'user' }),
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
