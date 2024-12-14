import { User } from '../model/user'

const users: User[] = [];

const createUser = ({id, username, email, password}: {id: number ,username: string; email: string; password: string;}): User => {
    const user = new User({
        id,
        username,
        email,
        password
    })
    users.push(user)
    return user;
}

const getUserByUsername = (username: string): User | undefined => {
    return users.find(user => user.getUsername() === username);
}

export default {createUser, getUserByUsername}