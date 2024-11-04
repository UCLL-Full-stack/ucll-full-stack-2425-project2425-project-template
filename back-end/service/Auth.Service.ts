import { User } from '../model/User';
import { Admin } from '../model/Admin';
import userDb from '../repository/User.db';
import adminDb from '../repository/Admin.db';

const getUserByUsername = async (username: string): Promise<User | null> => {
  return userDb.getUserByUsername(username);
};

const getAdminByUsername = async (username: string): Promise<Admin | null> => {
  return adminDb.getAdminByUsername(username);
};

export default {
  getUserByUsername,
  getAdminByUsername,
};
