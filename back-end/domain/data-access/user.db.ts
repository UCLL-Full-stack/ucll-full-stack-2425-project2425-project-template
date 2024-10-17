import { User } from "../model/user";

let current_ID = 1;

const users: User[] = [
    new User({ user_Id: current_ID++, firstName: "John", lastName: "Doe", email: "john.doe@example.com", password: "password", role: "admin", projects: [] }),
    new User({ user_Id: current_ID++, firstName: "Jane", lastName: "Doe", email: "jane.doe@example.com", password: "password", role: "lecturer", projects: [] }),
    new User({ user_Id: current_ID++, firstName: "Alice", lastName: "Smith", email: "alice.smith@example.com", password: "password", role: "admin", projects: [] }),
];

const createUser = ({ firstName, lastName, email, password, role }: User): User => {
    const user = new User({ user_Id: Date.now(), firstName, lastName, email, password, role, projects: [] });
    users.push(user);
    return user;
};

const getAllUsers = (): User[] => users;

export default {
    createUser,
    getAllUsers
};