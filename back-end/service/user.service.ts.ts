import userDb from '../repository/user.db';
import { User } from '../model/user';
import { UserSignupInput, AuthenticationResponse, UserLoginInput } from '../types';
import { Profile } from '../model/profile';
import bcrypt from 'bcrypt';
import generateJWTtoken from '../util/jwt';
import database from '../repository/database';

const getAllUsers = async (): Promise<User[]> => await userDb.getAllUsers();

// const getAllUsers = async (role: Role, username: string): Promise<Schedule[]> => {
//     if (role === 'admin') {
//         return await scheduleDb.getAllUsers();
//     } else {
//         throw new Error('You do not have access to this resource.');
//     }
// };

const getUserById = async (id: number): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findUnique({
            where: { id },
            include: {
                profile: true,
                recipes: {
                    include: {
                        ingredients: true,
                    },
                },
                schedule: {
                    include: {
                        recipes: {
                            include: {
                                ingredients: true,
                            },
                        },
                    },
                },
            },
        });
        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getUserByUsername = async (username: string): Promise<User> => {
    const user = await userDb.getUserByUsername({ username });
    if (!user) throw new Error(`User with username ${username} does not exist.`);
    return user;
};

const createUser = async ({
    firstName,
    lastName,
    username,
    email,
    password,
}: UserSignupInput): Promise<User> => {
    // check if username already registered
    const existingUser = await userDb.getUserByUsername({ username });
    if (existingUser) {
        throw new Error(`User with username: ${username} is already registered.`);
    }

    // check if email already registered
    const existingEmail = await userDb.getUserByEmail({ email });
    if (existingEmail) {
        throw new Error(`User with email: ${email} is already registered.`);
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const profile = new Profile({ firstName, lastName, email });
    const user = new User({ username, password: hashedPassword, profile });

    const createdUser = await userDb.addUser(user);
    if (!createdUser.getSchedule()) {
        throw new Error('Failed to create schedule for the user.');
    }

    return createdUser;
};

// const authenticate = async ({
//     username,
//     password,
// }: UserLoginInput): Promise<AuthenticationResponse> => {
//     const user = await userDb.getUserByUsername({ username });
//     if (!user) {
//         throw new Error('Invalid username or password.');
//     }

//     const isValidPass = await bcrypt.compare(password, user.getPassword());
//     if (!isValidPass) {
//         throw new Error('Invalid username or password.');
//     }

//     return {
//         token: generateJWTtoken(user.getUsername()),
//         username: user.getUsername(),
//         fullname: `${user.getProfile()?.getFirstName() ?? ''} ${
//             user.getProfile()?.getLastName() ?? ''
//         }`,
//         // role: user.getRole(),
//     };
// };

export default { getAllUsers, getUserById, getUserByUsername, createUser };
