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

const createUser = async ({
  firstName,
  lastName,
  email,
  password,
  role,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "trainer" | "nurse" | "admin";  // Including "admin" here
}): Promise<User> => {
  try {
    // Step 1: Create the base user
    const userPrisma = await database.user.create({
      data: {
        firstName,
        lastName,
        email,
        password,
        role,
      },
    });

    // Step 2: Based on the role, create the specific entity (trainer or nurse)
    if (role === "trainer") {
      // Create a Trainer linked to the User
      await database.trainer.create({
        data: {
          userId: userPrisma.id,
          // Add any default values or associations (like empty Pokémon list)
        },
      });
    } else if (role === "nurse") {
      // Create a Nurse linked to the User
      await database.nurse.create({
        data: {
          userId: userPrisma.id,
          // Add any default values or associations (like empty Pokémon management list)
        },
      });
    }
    // No separate logic is needed for 'admin' as it's handled by the `role` field in the User model

    // Step 3: Return the newly created user, transformed into a User domain model
    return User.from(userPrisma);  // Assuming you have a method to map Prisma user to your User model
  } catch (error) {
    console.error(error);
    throw new Error("Database error. See server log for details.");
  }
};

  
 export default { getAllUsers, getUserByEmail,createUser };
