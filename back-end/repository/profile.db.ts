import { Profile } from '../model/profile';
import database from '../util/database';

const getAllProfiles = async (): Promise<Profile[]> => {
    try {
        const profilesPrisma = await database.profile.findMany();
        return profilesPrisma.map((profile) => Profile.from(profile));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getProfileById = async ({ id }: { id: string }): Promise<Profile | null> => {
    try {
        const profilePrisma = await database.profile.findUnique({
            where: { id },
        });
        return profilePrisma ? Profile.from(profilePrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

// const getProfileByUserId = async ({ userId }: { userId: string }): Promise<Profile | null> => {
//     try {
//         const profilePrisma = await database.profile.findFirst({
//             where: { userId },
//         });
//         return profilePrisma ? Profile.from(profilePrisma) : null;
//     } catch (error) {
//         console.error(error);
//         throw new Error('Database error. See server log for details.');
//     }
// };

const createProfile = async (profile: Profile): Promise<Profile> => {
    try {
        const profilePrisma = await database.profile.create({
            data: {
                bio: profile.bio,
                userId: profile.userId,
            },
        });

        return Profile.from(profilePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default { getAllProfiles, getProfileById, createProfile, /* getProfileByUserId */ };
