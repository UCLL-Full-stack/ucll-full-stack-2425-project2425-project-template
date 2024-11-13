import { de } from 'date-fns/locale';
import userDB  from '../repository/user.db';
import { User } from '../model/user';
import { UserInput } from '../types';
import { Chat } from '../model/chat';


const getAllUsers = async (): Promise<User[]> => userDB.getAllUsers();

const getUserById = async ({id}: {id:number}) => {
  if (!id) {
    throw new Error('User ID is required');
  }
  return userDB.getUserById(id);
}
const createUser = async (user: UserInput) => {
  console.log(user)
  const newUser = new User({
    id: user.id,
    password: user.password,
    firstName: user.firstname,
    name: user.name,
    role: user.role,
  });
  return userDB.createUser(newUser);
}
const getUserByName = async (name: string) => {
  return userDB.getUserByName(name);
}

const loginUser = async (user: UserInput) => {
  const searchUser = await userDB.getUserByName(user.name);
  console.log(searchUser);
  if(searchUser === undefined || searchUser.getPassword() !== user.password) {
    throw new Error('Invalid credentials');
  }
  return searchUser;
}


export default
{ 
  getAllUsers,
  getUserById,
  createUser,
  loginUser,
  getUserByName
 };