import { User } from '../model/user';

const users = [
    new User({ id: 1, username: 'admin', password: 'admin1234', role: 'admin' }),
    new User({ id: 2, username: 'user', password: 'user1234', role: 'caretaker' }),
    new User({ id: 3, username: 'user2', password: 'user4321', role: 'visitor' }),
];

const getAllUsers = (): User[] => {
    return users;
};

export default {
    getAllUsers
};