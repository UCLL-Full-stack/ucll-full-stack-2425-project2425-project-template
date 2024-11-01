import { Profile } from '../model/profile';
import profileDb from '../repository/profile.db';

const getAllProfiles = (): Profile[] => {
    return profileDb.getAllProfiles();
};

const getProfileById = (id: number): Profile => {
    const profile = profileDb.getProfileById({id});
    if (!profile) {
        throw new Error(`Profile with id ${id} does not exist.`);
    }
    return profile;
}

export default {
    getAllProfiles,
    getProfileById,
};