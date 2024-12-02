import { Profile } from '../model/profile';
import profileDb from '../repository/profile.db';

const getAllProfiles = async (): Promise<Profile[]> => {
    return await profileDb.getAllProfiles();
};

const getProfileById = async (id: number): Promise<Profile> => {
    const profile = await profileDb.getProfileById({id});
    return profile;
}

export default {
    getAllProfiles,
    getProfileById,
};