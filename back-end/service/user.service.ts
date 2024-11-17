import { Profile } from '../model/profile';
import { User } from '../model/user';
import userDb from '../repository/user.db';
import { UserInput } from '../types';

const getAllUsers = async (): Promise<User[]> => {
    return await userDb.getAllUsers();
};

const getUserById = async (id: number): Promise<User> => {
    const user = userDb.getUserById({id});
    return user;
}

const createUser = async ({
    id,
    username,
    hashedPassword,
    profile: {
        id: profileId,
        email,
        firstName,
        lastName,
        bio
    } = {}
}: UserInput): Promise<User> => {
    if (!username || !hashedPassword) {
        throw new Error('Username and hashedPassword are required.');
    }

    if (await userDb.getUserByUsername({username})) {
        throw new Error(`User with username ${username} already exists.`);
    }

    const userProfile = profileId || firstName || lastName || bio ? new Profile({
        id: profileId,
        email: email || "",
        firstName: firstName || "",
        lastName: lastName || "",
        bio: bio || ""
    }) : undefined;

    const newUser = new User({
        id,
        username,
        hashedPassword,
        profile: userProfile,
        groups: [],
    });

    userDb.createUser(newUser);
    return newUser;
};

export default {
    getAllUsers,
    getUserById,
    createUser,
};
