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

export default {createUser}