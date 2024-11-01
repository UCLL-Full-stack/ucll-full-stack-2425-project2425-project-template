import { Profile } from '../model/profile';

const profiles: Profile[] = [];

const getAllProfiles = (): Profile[] => {
    return profiles;
};

const getProfileById = ({ id }: { id: number }): Profile | null => {
    const profile = profiles.find((profile) => profile.getId() === id);
    if (!profile) {
        return null;
    }
    return profile;
}

export default {
    getAllProfiles,
    getProfileById,
};
