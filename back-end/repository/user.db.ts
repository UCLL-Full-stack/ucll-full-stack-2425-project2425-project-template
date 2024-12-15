import { User } from '../model/user'

const users: User[] = [];

const createUser = ({username, email, password}: {username: string; email: string; password: string;}): User => {
    const user = new User({
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