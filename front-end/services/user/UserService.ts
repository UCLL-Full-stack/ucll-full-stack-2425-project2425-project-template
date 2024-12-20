import { User } from "@/types";
const loggedInUser = sessionStorage.getItem("loggedInUser");
const token = loggedInUser ? JSON.parse(loggedInUser).token : null;

const loginUser = (user: User) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

const getUserByEmail = (email: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/users/email/${email}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const getUserById = (userId: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/users/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};


const getProfileByUserId = (userId: string) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + `/users/profile/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

const UserService = {
  loginUser,
  getProfileByUserId,
  getUserByEmail,
  getUserById,
};

export default UserService;
