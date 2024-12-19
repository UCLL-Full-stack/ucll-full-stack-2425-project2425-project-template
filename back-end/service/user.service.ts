import bcrypt from 'bcrypt';
import userDB from '../repository/user.db';
import { generateJwtToken } from '../util/jwt';
import { AuthenticationResponse, UserInput } from '../types';
import { User } from '../model/user';
import studentService from './student.service';

const getAllUsers = async (): Promise<User[]> => {
    try {
        return await userDB.getAllUsers();
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw new Error('Failed to fetch users. See server logs for details.');
    }
};

const getUserByUsername = async ({ username }: { username: string }): Promise<User> => {
    try {
        const user = await userDB.getUserByUsername({ username });
        if (!user) {
            throw new Error(`User with username: ${username} does not exist.`);
        }
        return user;
    } catch (error) {
        console.error(`Error fetching user by username (${username}):`, error);
        throw new Error('Failed to fetch user. See server logs for details.');
    }
};

const authenticate = async ({ username, password }: UserInput): Promise<AuthenticationResponse> => {
    try {
        const user = await getUserByUsername({ username });

        const isValidPassword = await bcrypt.compare(password, user.getPassword());
        if (!isValidPassword) {
            throw new Error('Invalid username or password.');
        }

        const students = await studentService.getAllStudents();

        let studentId : number | undefined;

        students.forEach(student => {
            if (student.getUser().getId() == user.getId()) {
                studentId = student.getId();
            }
        });

        return {
            token: generateJwtToken({ username, role: user.getRole(), studentId}),
            username: username,
            fullname: `${user.getFirstName()} ${user.getLastName()}`,
            role: user.getRole(),
        };
    } catch (error) {
        console.error('Authentication error:', error);
        throw new Error('Authentication failed. See server logs for details.');
    }
};

const createUser = async ({
    username,
    password,
    firstName,
    lastName,
    email,
    role,
}: UserInput): Promise<User> => {
    try {
        const existingUser = await userDB.getUserByUsername({ username });
        if (existingUser) {
            throw new Error(`User with username "${username}" is already registered.`);
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
            username,
            password: hashedPassword,
            firstName,
            lastName,
            email,
            role,
        });

        const userData = {
            username: user.getUsername(),
            password: user.getPassword(),
            firstName: user.getFirstName(),
            lastName: user.getLastName(),
            email: user.getEmail(),
            role: user.getRole(),
        };

        return await userDB.createUser(userData); 
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Failed to create user. See server logs for details.');
    }
};

export default {
    getUserByUsername,
    authenticate,
    createUser,
    getAllUsers,
};
