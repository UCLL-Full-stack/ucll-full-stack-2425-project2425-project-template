import { User } from "@/types";

const getAllUsers = async () => {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + "/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const getUserByEmail = async (email: string) => {
  return await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/" + email, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

const addUser = async (userData: User) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  const newUser = await response.json();
  return newUser;
};

const deleteUser = async (userId: number) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response;
};

const loginUser = async (user: User) => {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/users/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed To login user");
    }
    return response;
  } catch (error) {
    console.log(error);
    return { status: 401, message: "Failed to login user" };
  }
};

const userService = {
  getAllUsers,
  getUserByEmail,
  addUser,
  deleteUser,
  loginUser,
};

export default userService;
