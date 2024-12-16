import { Student } from "@/types";


// const loginStudent = async (name: string, password: string, student: Student) => {
//     try {
//       const token = localStorage.getItem('token');
      
//       const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/students/login", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: token ? `Bearer ${token}` : '',
//         },
//         body: JSON.stringify({ username: name, password }),
//       });
  
//       if (response.status === 401) {
//         throw new Error('Unauthorized: Invalid credentials or expired session.');
//       }
  
//       if (!response.ok) {
//         throw new Error('Failed to login. Please check your credentials and try again.');
//       }
  
//       const data = await response.json();
  
//       if (data.token && data.fullname && data.username && data.role) {
//         return {
//           success: true,
//           student: {
//             token: data.token,
//             fullname: data.fullname,
//             username: data.username,
//             role: data.role,
//           },
//         };
//       } else {
//         throw new Error('Invalid response data. Missing required fields.');
//       }
//     } catch (error) {
//       return {
//         success: false,
//         message: error instanceof Error ? error.message : 'An error occurred during the login process.',
//       };
//     }
//   };
  
// const StudentService = {
//     loginStudent
// }
const login = async (username: string, password: string) => {
  const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/students/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }), 
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.errorMessage || 'Failed to login');
  }

  return response.json();
};

const signup = (student: Student) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/students/signup", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(student)
  })
}
const studentService = {
  signup,
  login,
};
export default studentService;