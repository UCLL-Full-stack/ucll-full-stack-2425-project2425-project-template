  import database from "../util/database";
  import { User } from "../model/user";  // Assuming User and Role are defined appropriately
  import { Role } from "../types";

  const getAllUsers = async (): Promise<User[]> => {
    try {
      // Query the database to retrieve all users
      const usersPrisma = await database.user.findMany();

      // Map the Prisma users to the User model
      const users = usersPrisma.map((userPrisma) => 
        new User({
          ...userPrisma,
          role: userPrisma.role as Role, // Ensure the role is cast to the Role enum if necessary
        })
      );

      return users; // Return the list of mapped users
    } catch (error) {
      console.error("Error fetching all users:", error);
      throw new Error('Database error. See server log for details.');
    }
  };

  const getUserByEmail = async ({ email }: { email: string }): Promise<User | null> => {
    try {
      // Query the database for a user with the given email
      const userPrisma = await database.user.findUnique({
        where: { email }, // Use `findUnique` for fetching a user by unique field
      });

      // If the user is found, map it to the User model, else return null
      if (userPrisma) {
        // Ensure role is treated as Role type (assuming it's an enum)
        const user = new User({
          ...userPrisma,
          role: userPrisma.role as Role, // Ensure the role is cast to the Role enum if necessary
        });

        return user;
      }
      
      return null; // Return null if no user is found
    } catch (error) {
      console.error("Error fetching user by email:", error);
      throw new Error('Database error. See server log for details.');
    }
  };

  export default { getAllUsers, getUserByEmail };
