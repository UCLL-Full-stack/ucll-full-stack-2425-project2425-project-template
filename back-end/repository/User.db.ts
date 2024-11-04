import { User } from '../model/User';

export const users = [
  new User({ id: 2, username: 'user', password: 'userpassword' }),
];

const getUserByUsername = async (username: string): Promise<User | null> => {
  return users.find(user => user.getUsername() === username) || null;
};

export default { getUserByUsername };