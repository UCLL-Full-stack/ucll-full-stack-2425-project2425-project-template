import { Build } from '../model/build';
import { Order } from '../model/order';
import { Part } from '../model/part';
import { User } from '../model/user';

const parts = [
    new Part({ id: 1, name: 'Ryzen 5600X', brand: 'AMD', type: 'CPU', price: 150}),
    new Part({ id: 2, name: 'Geforce RTX4060', brand: 'Nvidia', type: 'GPU', price: 300}),
]

const build = new Build({ id: 1, parts, price: 700, preBuild: true })
const order = new Order({ id: 1, builds: [build], price: 700, orderStatus: 'shipping', orderDate: new Date() })

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

users[0].addOrder(order);

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

const registerUser = ({ newUser }: { newUser: User }): User => {
    try {
        users.push(newUser);
        return newUser;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

export default {
    getAllUsers,
    getUserById,
    getUserByEmail,
    registerUser,
};