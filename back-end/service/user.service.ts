import { Profile } from '../model/profile';
import { User } from '../model/user';
import userDb from '../repository/user.db';
import { UserInput } from '../types';

const getAllUsers = (): User[] => {
    return userDb.getAllUsers();
};

const getUserById = (id: number): User => {
    const user = userDb.getUserById({id});
    if (!user) {
        throw new Error(`User with id ${id} does not exist.`);
    }
    return user;
}

const createUser = ({
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
}: UserInput): User => {
    if (!username || !hashedPassword) {
        throw new Error('Username and hashedPassword are required.');
    }

    if (userDb.getUserByUsername({username})) {
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
        tasks: [],
    });

    userDb.createUser(newUser);
    return newUser;
};

export default {
    getAllUsers,
    getUserById,
    createUser,
};
