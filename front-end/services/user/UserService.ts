import { User } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


const loginUser = (user: User) => {
  return fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};


const getAllUsers = async (token: string) => {
  return fetch(`${API_URL}/users`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, 
    },
  });
};

const getUserById = (id: string) => {
  return fetch(`${API_URL}/users/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const createUser = (user: User) => {
  return fetch(`${API_URL}/users/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

const getAllTrainers = () => {
  return fetch(`${API_URL}/users/trainers`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const promoteToTrainer = async (userId: string, token: string) => {
  return fetch(`${API_URL}/users/promote/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Token is passed explicitly
    },
  });
};

const updateUserRole = (id: string, role: string) => {
  return fetch(`${API_URL}/users/${id}/role`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ role }),
  });
};

const UserService = {
  loginUser,
  getAllUsers,
  getUserById,
  createUser,
  getAllTrainers,
  promoteToTrainer,
  updateUserRole,
};

export default UserService;