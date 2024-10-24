import { de } from 'date-fns/locale';
import userDB  from '../repository/user.db';
import { User } from '../model/user';
import { UserInput } from '../types';
import { Chat } from '../model/chat';

const getAllUsers = async () => {
  return userDB.getAllUsers();
}

const getUserById = async ({id}: {id:number}) => {
  return userDB.getUserById(id);
}
const createUser = async (user: UserInput) => {
  const newUser = new User({
    id: user.id,
    password: user.password,
    firstName: user.firstName,
    name: user.name,
  });
  return userDB.createUser(newUser);
}


export default
{ 
  getAllUsers,
  getUserById,
  createUser
 };