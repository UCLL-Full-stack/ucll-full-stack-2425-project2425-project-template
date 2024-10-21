import User from "../model/user";

const users: Array<User> = [];    

const saveUser = (user: User): User => {
    users.push(user);
    return user;
};

const getUserByUsername = ({username}: {username: string}): User | undefined => {
    try {
        return users.find((user) => {user.getUsername() === username}) || undefined;
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
};

const removeUser = (username: string): void => {
    const index = users.findIndex(user => user.getUsername() === username);
    if (index !== -1) {
        users.splice(index, 1);
    } else {
        throw new Error(`User with username ${username} not found.`);
    }
};

const getAllUsers = ():Array<User> => {
    return users;
};

const createTestUsers = (): void => {
    const user1 = new User({ username: "Janneke", password: "B@2", role: "admin" });
    const user2 = new User({ username: "Jannineke", password: "A&2", role: "member" });
    const user3 = new User({ username: "Jeanke", password: "C|3", role: "member" });
    saveUser(user1);
    saveUser(user2);
    saveUser(user3);
};
createTestUsers();

export default {saveUser,
                getUserByUsername,
                removeUser,
                getAllUsers,
                
                };