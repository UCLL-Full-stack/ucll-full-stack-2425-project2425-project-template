import { User } from "../model/user";

let currentId = 1;

const users: User[] = [
    new User({ id: currentId++, name: 'Bazinga', email: 'Bazinga@email.com', password: 'L'}),
    new User({ id: currentId++, name: 'Badinga', email: 'Badinga@email.com', password: 'L'})
];

const getAllUsers = (): User[] => {
    return users;
}

const getUserById = (id: number): User => {
    const user = users.find((user) => user.id === id);
    if (!user) {
        throw new Error(`User with id ${id} not found`);
    }
    return user;
}

const addUser = (user: { name: string, email: string, password: string }): User => {
    const newUser = new User({ id: currentId++, name: user.name, email: user.email, password: user.password });
    users.push(newUser);
    return newUser;
}


export default { getAllUsers, getUserById, addUser };
