import { User } from '../model/user';

export const users = [
    new User({ id: 1, name: 'Jente', password: '', role: 'admin' }),
    new User({ id: 2, name: 'Tyas', password: '', role: 'admin' }),
    new User({ id: 3, name: 'Senne', password: '', role: 'admin' }),
];

const getAllUsers = (): User[] => {
    return users;
};

const getUserById = ({ id }: { id: number }): User | null => {
    return users.find((user) => user.getId() === id) || null;
};

export default {
    getAllUsers,
    getUserById,
};
