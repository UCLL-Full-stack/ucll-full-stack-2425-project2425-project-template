import { get } from 'http';
import { User } from '../model/user';
import { Account } from '../model/account';

const johnDoe = new User({
    nationalRegisterNumber: '99.01.01-123.45',
    name: 'John Doe',
    birthDate: new Date('1990-01-01'),
    isAdministrator: false,
    phoneNumber: '+32 12 34 56 78',
    email: 'john.doe@example.com',
    password: 'P@ssw0rd!',
    accounts: [
        new Account({
            isShared: false,
            type: 'Savings',
        }),
        new Account({
            isShared: true,
            type: 'Transaction',
        }),
    ],
});

const users: User[] = [johnDoe];

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

const updateUser = async (updatedUser: User): Promise<User> => {
    const index = users.findIndex(
        (user) => user.getNationalRegisterNumber() === updatedUser.getNationalRegisterNumber()
    );
    if (index !== -1) {
        users[index] = updatedUser;
    }
    return updatedUser;
};

const deleteUser = async (nationalRegisterNumber: string): Promise<String> => {
    const index = users.findIndex(
        (user) => user.getNationalRegisterNumber() === nationalRegisterNumber
    );
    if (index !== -1) {
        users.splice(index, 1);
    }
    return 'User deleted successfully.';
};

export default {
    createUser,
    getUserByNationalRegisterNumber,
    getUserByEmailAndPassword,
    getUserByEmail,
    getAllUsers,
    updateUser,
    deleteUser,
};
