import { User } from '../model/user';
import userDb from '../repository/user.db';

const getUserByUsername = async (username: string): Promise<User | null> => {
  return userDb.getUserByUsername({ username });
};

export default {
  getUserByUsername,
};
