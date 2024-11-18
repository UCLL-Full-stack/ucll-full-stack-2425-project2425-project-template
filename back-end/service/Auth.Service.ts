import { User } from '../model/user';
import { Admin } from '../model/admin';
import userDb from '../repository/user.db';
import adminDb from '../repository/admin.db';

const getUserByUsername = async (username: string): Promise<User | null> => {
  return userDb.getUserByUsername({ username });
};

const getAdminByUsername = async (username: string): Promise<Admin | null> => {
  return adminDb.getAdminByUsername(username);
};

export default {
  getUserByUsername,
  getAdminByUsername,
};
