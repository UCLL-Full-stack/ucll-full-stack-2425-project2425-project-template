import userDb from "../repository/user.db";
import { User } from "../model/user";
import bcrypt from 'bcrypt';
import { AuthenticationResponse, UserInput } from '../types/types';
import {generateJwtToken} from '../util/jwt';


const getAllUsers = async (): Promise<User[]> => userDb.getAllUsers();


const getUserById = async (id: number): Promise<User> => {
  const user = await userDb.getUserById({id});
  
  if (!user) {
    throw new Error(`User with id ${id} not found`);
  }
  
  return user;
};

const getUserByName = async ({ name }: { name: string }): Promise<User> => {
  const user = await userDb.getUserByName({ name });
  if (!user) {
      throw new Error(`User with name: ${name} does not exist.`);
  }
  return user;
};

const getUserByEmail = async ({ email }: { email: string }): Promise<User> => {
  const user = await userDb.getUserByEmail({ email });
  if (!user) {
    throw new Error(`User with email: ${email} does not exist.`);
  }
  return user;
};

/**
 * Authenticates the user by comparing passwords and generating a JWT.
 * 
 * @param {UserInput} userInput - The user input containing username and password.
 * @returns {Promise<AuthenticationResponse>} - The authentication response with username, token, and fullname.
 */
const authenticate = async ({ email, password }: UserInput): Promise<AuthenticationResponse> => {
  if (!email) {
    throw new Error('Email is required for authentication.');
  }
  const user = await getUserByEmail({ email });
  const userPassword = user.getPassword();
  if (!userPassword) {
    throw new Error('User password is undefined.');
  }
  if (password === undefined) {
    throw new Error('User password is undefined.');
  }
  const isValidPassword = await bcrypt.compare(password, userPassword);
  if (!isValidPassword) {
      throw new Error('Incorrect password.');
  }
  
  return {
      token: generateJwtToken({ email, role: user.getRole() }),
      email,
      userId: user.getId() ?? (() => { throw new Error('User ID is undefined.'); })(),
      role: user.getRole(),
  };
};

const createUser = async (
  name: string,
  email: string,
  password: string,
  role: string,
): Promise<User> => {
  const existingUser = await userDb.getUserByEmail({ email });
  if (existingUser) {
    throw new Error('User with this email already exists.');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    name: name,
    email: email,
    password: hashedPassword,
    role: role
  });
  return userDb.createUser(newUser);
}

export default {createUser, getUserByName,getUserByEmail, getAllUsers,  authenticate, getUserById };