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

const getUserByUsername = async ({ username }: { username: string }): Promise<User> => {
  const user = await userDb.getUserByUsername({ username });
  if (!user) {
      throw new Error(`User with username: ${username} does not exist.`);
  }
  return user;
};

// const createUser = async (user: User): Promise<User> => userDb.createUser(user);

const authenticate = async ({ username, password }: UserInput): Promise<AuthenticationResponse> => {
  const user = await getUserByUsername({ username });
  const isValidPassword = await bcrypt.compare(password, user.getPassword());
  if (!isValidPassword) {
      throw new Error('Incorrect password.');
  }
  
  return {
      token: generateJwtToken({ username, role: user.getRole() }),
      username,
      role: user.getRole(),
  };
};
const createUser = async ({
  username,
  email,
  role,
  password,
}: UserInput): Promise<User> => {
  const existing = await userDb.getUserByUsername({ username });
  if (existing) {
      throw new Error(`User with username: ${username} is already registered.`);
  }
  const hashedPassword = await bcrypt.hash(password, 12);
  const user = new User({ name: username, email, role, password: hashedPassword });
  return await userDb.createUser(user);
};
export default { getUserByUsername, getAllUsers, createUser, authenticate, getUserById };