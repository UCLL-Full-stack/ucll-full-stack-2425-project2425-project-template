import { Profile } from '../model/profile';
import { User } from '../model/user';

const users = [
    new User({
        id: 0,
        username: 'annie',
        password: '@nnie1234',
        profile: new Profile({
            id: 0,
            firstName: 'Anette',
            lastName: 'Hardy',
            email: 'annie@ucll.be',
            user: undefined,
        }),
    }),
    new User({
        id: 1,
        username: 'shulin',
        password: 'shul!n1234',
        profile: new Profile({
            id: 1,
            firstName: 'Shulin',
            lastName: 'Xu',
            email: 'shulin@ucll.be',
            user: undefined,
        }),
    }),
    new User({
        id: 2,
        username: 'amelie',
        password: 'h0tchocol@te101',
        profile: new Profile({
            id: 2,
            firstName: 'Amelie',
            lastName: 'Lammens',
            email: 'amelie@ucll.be',
            user: undefined,
        }),
    }),
];

// Set user reference in profiles after user objects are created
users.forEach((user) => {
    user.getProfile().setUser(user);
});

const getAllUsers = (): User[] => users;

const getUserById = ({ id }: { id: number }): User | null => {
    return users.find((user) => user.getId() === id) || null;
};

const addUser = (user: User): User => {
    users.push(user);
    return user;
};

export default {
    getAllUsers,
    getUserById,
    addUser,
};
