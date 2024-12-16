import userDb from "../repository/user.db";
import { User } from "../model/user";

const getAllUsers = async (): Promise<User[]> => userDb.getAllUsers();


const getUserById = async (id: number): Promise<User> => {
  const user = await userDb.getUserById({id});
  
  if (!user) {
    throw new Error(`User with id ${id} not found`);
  }
  
  return user;
};

const addUser = async (user: User): Promise<User> => userDb.addUser(user);

export default { getAllUsers, getUserById, addUser };
