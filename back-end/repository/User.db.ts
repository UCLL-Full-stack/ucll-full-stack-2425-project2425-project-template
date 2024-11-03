import { User } from '../model/User';

const users = [
    new User({
        id: 1,
        username: "Alexander_Symons",
        email: "Alexander@Symons.com",
        password: "P@ssword", 
        // role: Role.USER,
    }),
    
    new User({
        id: 2,
        username: "Niel_Stroobants",
        email: "Niel@Stroobants.com",
        password: "P@ssword2",
        // role: Role.ADMIN, 
    }),
];

const getAllUsers = (): User[] => {
    return users;
};

const getUserById = (id: number): User | null => {
    const user = users.find((user) => user.getId() === id);
    return user || null;
}

export default {
    getAllUsers,
    getUserById
};
