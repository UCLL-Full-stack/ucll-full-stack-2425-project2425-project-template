import userDB from '../repository/user.db';
import { User } from '../model/user';
import { TeamInput, UserInput } from '../types';
import userDb from '../repository/user.db';
import teamDb from '../repository/team.db';

const getAllUsers = async (): Promise<User[]> => {
    const users = await userDB.getAllUsers();
    return users;
};

// const createUser = async ({ name, password, role, team: teamInput }: UserInput): Promise<User> => {
//     const team = await teamDb.getTeamById({ id: teamInput.id });
//     const user = new User({ name, password, role, team });
//     return await userDB.createUser(user);
// };

const createUser = async ({ name, password, role, team }: UserInput) => {
    try {
        const data: any = {
            name,
            password,
            role,
        };

        if (team) {
            data.team = { connect: { id: team.id } };
        }
        const newUser = await userDb.createUser(data);
        return newUser;
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Error in creating user. See logs for details');
    }
};

const getUserById = async ({ id }: { id: number }): Promise<User> => {
    const user = await userDB.getUserById({ id });
    if (!user) {
        throw new Error(`User with id: ${id} does not exist.`);
    }
    return user;
};

const getUserByName = async ({ name }: { name: string }): Promise<User> => {
    const user = await userDB.getUserByName({ name });
    if (!user) {
        throw new Error(`User with username: ${name} does not exist.`);
    }
    return user;
};
export default { getAllUsers, createUser, getUserByName, getUserById };
