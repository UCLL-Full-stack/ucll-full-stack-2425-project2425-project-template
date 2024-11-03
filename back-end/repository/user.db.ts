import { get } from 'http';
import { User } from '../model/user';

const users: User[] = [
    new User({
        nationalRegisterNumber: '01.01.01-001.01',
        name: 'John Doe',
        birthDate: new Date('1990-01-01T00:00:00.000Z'),
        isAdministrator: true,
        phoneNumber: '012345678',
        email: 'john.doe@gmail.com',
        password: 'Password1!',
    }),
];

const getAllUsers = (): User[] => {
    return users;
};

const createUser = ({
    nationalRegisterNumber,
    name,
    birthDate,
    isAdministrator,
    phoneNumber,
    email,
    password,
}: User): User => {
    const existingUser = getUserByNationalRegisterNumber(nationalRegisterNumber);
    if (existingUser) {
        throw new Error(
            `User with national register number ${nationalRegisterNumber} already exists.`
        );
    }
    const user = new User({
        nationalRegisterNumber,
        name,
        birthDate,
        isAdministrator,
        phoneNumber,
        email,
        password,
    });
    users.push(user);
    return user;
};

const getUserByNationalRegisterNumber = (nationalRegisterNumber: string): User | undefined => {
    return users.find((user) => user.getNationalRegisterNumber() === nationalRegisterNumber);
};

const getUserByEmailAndPassword = (email: string, password: string): User | undefined => {
    return users.find((user) => user.getEmail() === email && user.getPassword() === password);
};

const getUserByEmail = (email: string): User | undefined => {
    return users.find((user) => user.getEmail() === email);
};

export default {
    createUser,
    getUserByNationalRegisterNumber,
    getUserByEmailAndPassword,
    getUserByEmail,
    getAllUsers,
};
