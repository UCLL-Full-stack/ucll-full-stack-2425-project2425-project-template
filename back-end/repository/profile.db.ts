import { Profile } from '../model/profile';
import database from './database';

const getAllProfiles = async (): Promise<Profile[]> => {
    try {
        const profilePrisma = await database.profile.findMany();
        return profilePrisma.map((profilePrisma) => Profile.from(profilePrisma));
    } catch (error) {
        console.log(error);
        throw new Error('Database error, see server log for details.');
    };
};

const getProfileById = async ({ id }: { id: number }): Promise<Profile> => {
    try {
        const profilePrisma = await database.profile.findUnique({
            where: {
                id
            }
        });
        if (!profilePrisma) {
            throw new Error(`profile with id ${id} does not exist.`);
        }
        return Profile.from(profilePrisma);
    } catch (error) {
        console.log(error);
        throw new Error('Database error, see server log for details.');
    };
}

export default {
    getAllProfiles,
    getProfileById,
};
