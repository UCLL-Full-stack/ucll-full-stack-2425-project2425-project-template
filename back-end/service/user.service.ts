import userDb from '../repository/user.db';
import { User } from '../model/user';
import { UserInput } from '../types/index';

const createUser = ({
    nationalRegisterNumber,
    name,
    birthDate,
    isAdministrator,
    phoneNumber,
    email,
    password,
}: UserInput): User => {
    const existingUser = userDb.getUserByNationalRegisterNumber(nationalRegisterNumber);
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
    return userDb.createUser(user);
};

const getUserByEmail = (email: string): User | undefined => {
    const user = userDb.getUserByEmail(email);
    if (!user) {
        throw new Error(`User with email ${email} not found.`);
    }
    return userDb.getUserByEmail(email);
};

const getUserByNationalRegisterNumber = (nationalRegisterNumber: string): User | undefined => {
    const user = userDb.getUserByNationalRegisterNumber(nationalRegisterNumber);
    if (!user) {
        throw new Error(`User with national register number ${nationalRegisterNumber} not found.`);
    }
    return userDb.getUserByNationalRegisterNumber(nationalRegisterNumber);
};

export default {
    createUser,
    getUserByEmail,
    getUserByNationalRegisterNumber,
};
