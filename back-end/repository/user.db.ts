import { User } from '../model/user';
import database from './database';

const getAllUsers = async (): Promise<User[]> => {
  try {
      const usersPrisma = await database.user.findMany();
      return usersPrisma.map((userPrisma) => User.from(userPrisma));
  } catch (error) {
      console.error(error);
      throw new Error('Database error.');
  }
};

const getUserById = async ({ id }: { id: number }): Promise<User | null> => {
  try {
      const userPrisma = await database.user.findUnique({
          where: { id },
      });

      return userPrisma ? User.from(userPrisma) : null;
  } catch (error) {
      console.error(error);
      throw new Error('Database error.');
  }
};

const createUser = async (user: User): Promise<User> => {
  try {
      const userPrisma = await database.user.create({
          data: {
              name: user.getName(),
              password: user.getPassword(),
              email: user.getEmail(),
          },
      });
      return User.from(userPrisma);
  } catch (error) {
      console.error(error);
      throw new Error('Database error.');
  }
};

const getUserByUsername = async ({ username }: { username: string }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findFirst({
            where: { name: username },
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default { getAllUsers, getUserById, createUser, getUserByUsername };
