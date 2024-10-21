import Profile from "../model/profile";

const profiles: Array<Profile> = [];    

const saveProfile = (profile: Profile): Profile => {
    profiles.push(profile);
    return profile;
};

const getProfileByEmail = ({email}: {email: string}): Profile | undefined => {
    try {
        return profiles.find((profile) => {profile.getEmail() === email}) || undefined;
    } catch (error) {
        throw new Error('Database error. See server log for details.');
    }
};

const removeProfile = (email: string): void => {
    const index = profiles.findIndex(profile => profile.getEmail() === email);
    if (index !== -1) {
        profiles.splice(index, 1);
    } else {
        throw new Error(`Profile with email ${email} not found.`);
    }
};

const getAllProfiles = ():Array<Profile> => {
    return profiles;
};

const createTestProfiles = (): void => {
    const profile1 = new Profile({ email: "Janneke@hotmail.com", name: "Jan", lastname: "Janssens" });
    const profile2 = new Profile({ email: "Jannineke@telenet.be", name: "Jannine", lastname: "Janssens" });
    const profile3 = new Profile({ email: "Jeanke@outlook.com", name: "Jean", lastname  : "Janssnes" });
    saveProfile(profile1);
    saveProfile(profile2);
    saveProfile(profile3);
};
createTestProfiles();

export default {saveProfile,
                getAllProfiles,
                removeProfile,
                getProfileByEmail,
                };