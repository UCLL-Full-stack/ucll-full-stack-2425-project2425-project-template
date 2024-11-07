import { User } from "../model/User";
import { UserInput } from "../types";

const addUser = async ({
    userId,
    username,
    password,
    role,
    attendance
}: UserInput): Promise<User> => {
    const user = new User ({
        userId,
        username,
        password,
        role,
        attendance,
    })
    return user;
}

export default {
    addUser,
}