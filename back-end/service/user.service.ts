import { de } from 'date-fns/locale';
import userDB  from '../repository/user.db';

const getAllUsers = async () => {
  return userDB.getAllUsers();
}

const getUserById = async ({id}: {id:number}) => {
  return userDB.getUserById(id);
}


export default
{ 
  getAllUsers,
  getUserById
 };