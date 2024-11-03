import { User } from "../model/user";

const users = [
    new User({
        id: 1,
        name: 'Barack Obama',
        email: 'barack.obama@gmail.com',
        password: 'YesYouCan',
        address: '1600 Pennsylvania Ave NW, Washington, DC'
    }),
    new User({
        id: 2,
        name: 'Neil Armstrong',
        email: 'neil.armstrong@nasamail.gov',
        password: 'OneSmallStep',
        address: 'Apollo Blvd, Wapakoneta, OH'
    }),
    new User({
        id: 3,
        name: 'Stephen Hawking',
        email: 'stephen.hawking@cambridge.ac.uk',
        password: 'BigBang42',
        address: 'University of Cambridge, Cambridge, UK'
    }),
]

const getAllUsers = (): User[] => users;

const getUserById = ({ id }: { id: number }): User | null => {
    try {
        return users.find((user) => user.getId() === id) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserByEmail = ({ email }: { email: string }): User | null => {
    try {
        return users.find((user) => user.getEmail() === email) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
};