import { Profile } from '../model/profile';
import database from './database';

const addProfile = async (id: number, profile: Profile): Promise<Profile> => {
    try {
        const result = await database.profile.create({
            data: {
                firstName: profile.getFirstName(),
                lastName: profile.getLastName(),
                age: profile.getAge(),
                location: {
                    connect: {
                        id: profile.getLocation().getId(),
                    },
                },
                category: {
                    connect: {
                        id: profile.getCategory().getId(),
                    },
                },
                user: {
                    connect: {
                        id,
                    },
                },
            },
            include: {
                location: true,
                category: true,
            },
        });
        return Profile.from(result);
    } catch (error) {
        console.log(error);
        throw new Error('Database error, see server logs for more detail');
    }
};
export default { addProfile };
