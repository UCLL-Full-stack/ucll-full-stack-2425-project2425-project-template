import { Profile } from '../model/profile';
import userDb from '../repository/user.db';
import { ProfileUpdateInput } from '../types';

const getProfileByUserId = (userId: number): Profile => {
    const user = userDb.getUserById({ id: userId });
    if (!user) throw new Error(`User with id ${userId} does not exist.`);
    return user.getProfile();
};

const updateProfile = (userId: number, profileUpdate: ProfileUpdateInput): Profile => {
    const user = userDb.getUserById({ id: userId });
    if (!user) throw new Error(`User with id ${userId} does not exist.`);
    const profile = user.getProfile();
    profile.setFirstName(profileUpdate.firstName);
    profile.setLastName(profileUpdate.lastName);
    profile.setEmail(profileUpdate.email);
    return profile;
};

export default { getProfileByUserId, updateProfile };
