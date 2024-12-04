import { Authentication, User } from "@/types";

const createUser = async (user: User): Promise<void> => {
  await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  }).catch((error) => {
    console.error("Error creating user:", error);
    throw new Error("Failed to create user");
  });
};

const getUserByEmailAndPassword = async (
  credentials: Authentication
): Promise<User> => {
  const response = await fetch(
    process.env.NEXT_PUBLIC_API_URL + "/users/login",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials), // Corrected payload format
    }
  );

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const user = await response.json();

  // Verify the user object has the required properties
  if (!user || !user.email) {
    throw new Error("User data is invalid or missing an email");
  }

  return user;
};

const getUserByNationalRegisterNumber = async (
  userNationalRegisterNumber: string
): Promise<User> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${userNationalRegisterNumber}`
  );

  if (!response.ok) {
    throw new Error(
      `Failed to fetch user by national register number ${userNationalRegisterNumber}`
    );
  }

  const user = await response.json();
  return user;
};

const UserService = {
  createUser,
  getUserByEmailAndPassword,
  getUserByNationalRegisterNumber,
};

export default UserService;
