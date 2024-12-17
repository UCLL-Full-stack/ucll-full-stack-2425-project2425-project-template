import { RegisterData, LoginData } from "../types/auth";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

const register = async (data: RegisterData) => {
  try {
    const response = await fetch(`${apiUrl}/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to register");
    }

    return await response.json();
  } catch (error) {
    console.error("Error registering:", error);
    throw error;
  }
};

const login = async (data: LoginData) => {
  try {
    const response = await fetch(`${apiUrl}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Failed to login");
    }

    const result = await response.json();
    localStorage.setItem('token', result.token); 
    // localStorage.setItem('role', result.role); 

  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

const getAllUsers = async (token: string) => {
  try {
    const token = localStorage.getItem('token'); 
    if (!token) {
      throw new Error("No token found");
    }

    const response = await fetch(`${apiUrl}/users`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`, 
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

const getUserById = async (userId: number) => {
  try {
    const token = localStorage.getItem('token'); 
    if (!token) {
      throw new Error("No token found");
    }

    const response = await fetch(`${apiUrl}/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

const authService = { register, login, getAllUsers, getUserById };

export default authService;