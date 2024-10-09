import { User } from "../user";

const users: User[] = [
    new User({ user_id: 1, firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', password: 't'}),
    new User({ user_id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane.doe@example.com', password: 't'})
]

const getAllUsers = (): User[] => {
    return users;
}

const getUserById = (id: number): User => {
    const user = users.find((user) => user.user_id == id);
    if (!user) {
        throw new Error(`User with id ${id} not found`)
    }
    return user;
}

export default {getAllUsers, getUserById}