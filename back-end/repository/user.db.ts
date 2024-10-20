import { ro } from "date-fns/locale";
import { User } from "../model/user";
import { resolve } from "path";
import exp from "constants";

export const users = [
  new User({
    id: 1,
    role: 'admin',
    name: 'admin',
    firstName: 'admin',
    password: 'admin',
  }),
  new User({
    id: 2,
    role: 'user',
    name: 'user',
    firstName: 'user',
    password: 'user',
  }),
];

const getAllUsers = async (): Promise<User[]> => {
  return users;
}

const getUserById = async (id: number): Promise<User|undefined> => {


  return users.find(user => user.getId() === id);
}

export default { getAllUsers, getUserById };
    