import { User } from '../model/user';
import database from '../util/database';

export const users = [
  new User({ id: 2, username: 'user', password: 'userpassword' }),
];

const getAllUsers = async (): Promise<User[]> => {
  try {
    const userPrisma = await database.user.findMany();
    return userPrisma.map((userPrisma) => User.from(userPrisma));
  } catch (error) {
    console.error(error);
    throw new Error('Database error. See server logs for details.');
  }
};

const getUserByUsername = async ({ username }: { username: string}): Promise<User | null> => {
  try {
    const userPrisma = await database.user.findFirst({
      where: { username },
    });
    return userPrisma ? User.from(userPrisma) : null;
  } catch (error) {
    console.error(error);
    throw new Error('Database error. See server logs for details.');
  }
};

const createUser = async ({ 
  username, 
  password 
}: User): Promise<User> => {
  try {
    const userPrisma = await database.user.create({
      data: { 
        username, 
        password,
      },
    });
    return User.from(userPrisma);
  } catch (error) {
    console.error(error);
    throw new Error('Database error. See server logs for details.');
  }
}

export default { 
  getAllUsers, 
  getUserByUsername,
  createUser,
}; 