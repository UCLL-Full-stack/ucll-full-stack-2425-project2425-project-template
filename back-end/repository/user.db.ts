import { User } from '../model/user';
import database from '../util/database';

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

const getUserByEmail = async ({ email }: { email: string }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findFirst({
            where: { email },
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error.');
    }
}

const createUser = async (user: User): Promise<User> => {
  try {
    console.log(user);
      const userPrisma = await database.user.create({
          data: {
              name: user.getName(),
              password: user.getPassword(),
              email: user.getEmail(),
              role: user.getRole(),
          },
      });
      return User.from(userPrisma);
  } catch (error) {
      console.error(error);
      throw new Error('Database error.');
  }
};

const getUserByName = async ({ name }: { name: string }): Promise<User | null> => {
    try {
        const userPrisma = await database.user.findFirst({
            where: { name: name },
        });

        return userPrisma ? User.from(userPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default { getAllUsers, getUserById,getUserByEmail, createUser, getUserByName };
