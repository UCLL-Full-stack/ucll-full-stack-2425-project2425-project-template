import { Profile } from '../model/profile';

const profiles = [
    new Profile({
        id: 1,
        description: "This is my profile",
        profilePic: "/images/placeholder.png"
    })
];

const getAllProfiles = (): Profile[] => profiles;

const getProfileById = (id: number ): Profile | null => {
    return profiles.find((profile) => profile.getId() === id) || null;
};

// const newProfile = (user: User, game: Game): Purchase => {
//     libraryGames.push(game);
//     return game;
// }

export default {
    getAllProfiles,
    getProfileById,
};
