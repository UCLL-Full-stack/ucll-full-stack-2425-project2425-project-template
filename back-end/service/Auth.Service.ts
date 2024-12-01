import { User } from '../model/User';
import userDb from '../repository/User.db';

const getUserByUsername = async (username: string): Promise<User | null> => {
  return userDb.getUserByUsername({ username });
};

export default {
  getUserByUsername,
};
