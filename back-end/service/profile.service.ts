import { Profile } from '../model/profile';
import profileDb from '../repository/profile.db';
import { ProfileInput } from '../types';
import database from '../util/database';

const getAllProfiles = async (): Promise<Profile[]> => {
    try {
        const profiles = await profileDb.getAllProfiles();
        return profiles;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getProfileById = async (id: string): Promise<Profile> => {
    const profile = await profileDb.getProfileById({ id });
    if (!profile) {
        throw new Error(`Profile with ID ${id} not found`);
    }
    return profile;
};

// const getProfileByUserId = async (userId: string): Promise<Profile> => {
//     const profile = await profileDb.getProfileByUserId({ userId });
//     if (!profile) {
//         throw new Error(`Profile with user ID ${userId} not found`);
//     }
//     return profile;
// };

const createProfile = async ({ bio, userId }: ProfileInput): Promise<Profile> => {
    try {
        const profilePrisma = await database.profile.create({
            data: {
                bio: bio,
                userId: userId,
            },
        });

        return Profile.from(profilePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default { getProfileById, createProfile, getAllProfiles, /* getProfileByUserId */ };
