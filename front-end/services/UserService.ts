import { User } from "@/types";
const registerUser = async (user: User) => {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to register. Please check your data.');
    }

    return { success: true, message: 'Registration successful!', data };
  } catch (error: any) {
    return {
      success: false,
      message: error.message || 'An error occurred during the registration process.',
    };
  }
};

const loginUser = async (username: string, password: string, user: User) => {
    try {
      const token = localStorage.getItem('token');
      
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({ username: username, password }),
      });
  
      if (response.status === 401) {
        throw new Error('Unauthorized: Invalid credentials or expired session.');
      }
  
      if (!response.ok) {
        throw new Error('Failed to login. Please check your credentials and try again.');
      }
  
      const data = await response.json();
  
      if (data.token && data.fullname && data.username && data.role) {
        return {
          success: true,
          user: {
            token: data.token,
            fullname: data.fullname,
            username: data.username,
            role: data.role,
          },
        };
      } else {
        throw new Error('Invalid response data. Missing required fields.');
      }
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'An error occurred during the login process.',
      };
    }
  };

  const getStudentByUsername = async (username: string) => {
    try {
      const loggedInUser = localStorage.getItem('loggedInUser')
      const token = loggedInUser ? JSON.parse(loggedInUser).token : null;
  
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/students?username=${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : '',
        },
      });
  
      const data = await response.json();
  
      if (data.id && data.username && data.role) {
        return {
          success: true,
          student: {
            id: data.id,
            username: data.username,
            role: data.role,
          },
        };
      } else {
        throw new Error('Invalid response data. Missing required fields.');
      }
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'An error occurred during the user data fetch process.',
      };
    }
  }


  
const UserService = {
  loginUser,
  registerUser,
  getStudentByUsername
};

export default UserService;
