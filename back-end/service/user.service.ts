import bcrypt from 'bcrypt';
import { AuthenticationResponse, Userinput } from "../types";
import { generateJwtToken } from '../util/jwt';
import userDB from '../repository/user.db';
import database from '../util/database';
import { User } from '../model/user';

const getAllUsers = async (): Promise<User[]> => userDB.getAllUsers();

// Function to find the user by email
const getUserByEmail = async ({ email }: { email: string }): Promise<User> => {
    const user = await userDB.getUserByEmail({ email });
    if (!user) {
      throw new Error(`User with email: ${email} does not exist.`);
    }
    return user;
  };
  
  // Function to authenticate a user
  const authenticate = async ({ email, password }: { email: string, password: string }): Promise<AuthenticationResponse> => {
    console.log('Attempting authentication for email:', email);

    const user = await getUserByEmail({ email });

    // Check if user exists
    if (!user) {
        throw new Error('User not found.');
    }

    console.log("User found:", user);
    console.log("Stored password hash:", user.password);  // Stored hashed password
    console.log("Attempted plain text password:", password);  // The password user inputs

    // Compare the provided password with the stored hash
    const isValidPassword = await bcrypt.compare(password, user.password);

    console.log("Password comparison result:", isValidPassword); // Debug the result of the comparison

    if (!isValidPassword) {
        throw new Error('Incorrect password.');
    }

    // Return JWT token if password is valid
    return {
        token: generateJwtToken({ email, role: user.role }),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
    };
};

const createUser = async ({
  firstName,
  lastName,
  email,
  password,
  role,
}: Userinput): Promise<User> => {
  // Step 1: Check if the email already exists
  const existing = await userDB.getUserByEmail({ email });
  if (existing) {
    throw new Error(`User with email ${email} already exists`);
  }

  // Step 2: Validate the role
  if (!["trainer", "nurse", "admin"].includes(role)) {
    throw new Error(`Invalid role: ${role}. Role must be either 'trainer', 'nurse', or 'admin'.`);
  }

  // Step 3: Hash the password
  const hashPassword = await bcrypt.hash(password, 10);

  // Step 4: Create the user object
  const user = new User({
    firstName,
    lastName,
    email,
    password: hashPassword,
    role: role as "trainer" | "nurse" | "admin", // Type assertion here
  });

  // Step 5: Persist the user to the database
  return await userDB.createUser(user);
};


export default { authenticate,getAllUsers, createUser,getUserByEmail };
