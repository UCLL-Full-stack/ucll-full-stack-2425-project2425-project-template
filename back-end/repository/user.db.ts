import { User } from '../model/user';

const users = [
    new User({
        id: 1,
        username: 'meesverbeeck',
        hashedPassword: 't'
    }),
    new User({
        id: 2,
        username: 'larsfrancois',
        hashedPassword: 't'
    }),
];

const getAllUsers = (): User[] => {
    return users;
};

const getUserById = ({ id }: { id: number }): User | null => {
    const user = users.find((user) => user.getId() === id);
    if (!user) {
        return null;
    }
    return user; 
}

const getUserByUsername = ({ username }: { username: string }): User | null => {
    const user = users.find((user) => user.getUsername() === username);
    if (!user) {
        return null;
    }
    return user; 
}

const createUser = (user: User): User => {
    users.push(user);
    return user;
};

export default {
    getAllUsers,
    getUserById,
    getUserByUsername,
    createUser,
};
