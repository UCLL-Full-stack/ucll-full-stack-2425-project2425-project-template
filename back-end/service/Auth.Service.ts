import { User } from '../model/User';
import userDb from '../repository/User.db';

const getUserByUsername = async (username: string): Promise<User | null> => {
  return userDb.getUserByUsername({ username });
};

async function validateLoginInput(username: string, password: string, role: string): Promise<void> {
  if (!username || !password || !role) {
    throw new Error('Username, password, and role are required');
  }
}

export default {
  getUserByUsername,
  validateLoginInput
};
