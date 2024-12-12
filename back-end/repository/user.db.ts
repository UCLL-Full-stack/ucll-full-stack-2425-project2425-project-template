import {User} from "../model/user";


const users: User[] = [
    new User({
        id: 1,
        username: '@AliceWonder',
        firstName: 'Alice',
        lastName: 'Wonder',
        email: 'alicewonder@gmail.com',
        password: 'alice123',
        role: 'admin',
    }),
    new User({
        id: 2,
        username: '@JohnDoe',
        firstName: 'John',
        lastName: 'Doe',
        email: 'johndoe@gmail.com',
        password: 'john123',
        role: 'user',
    })
]


const getUserById = ({id}: { id: number }): User | null => {
    return users.find((user) => user.getUserId() === id) || null;
}

export default {
    getUserById
}