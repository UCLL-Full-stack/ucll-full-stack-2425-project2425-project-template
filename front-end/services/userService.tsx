import { User } from "types";

const loginUser = (user: User) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
  })
}

const signupUser = (user: User) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/signup", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
  })
}
    

    // async function deleteUser(rnummer : string) {
    //     const storedToken: string | null = sessionStorage.getItem('loggedInUser');
    //     try {
    //       const token = storedToken ? JSON.parse(storedToken)?.token : undefined;
    //       console.log(token)
    //       return await fetch(process.env.NEXT_PUBLIC_API_URL+ `/users/deleteUserAndLinkedPersonAndChatsAndMessagesByRnummer/${rnummer}`, {
    //         method: "DELETE",
    //         headers: {
    //           "accept": 'application/json',
    //           "Content-Type" : "application/json",
    //           "Authorization":`Bearer ${token}`
    //         },
           
    //       } );
    //     } catch (error) {
    //       console.error('Error adding person:', error);
    //       throw new Error('Failed to add person');
    //     }
    //   }
    
const getAllUsers = () => {

  const loggedInUser = localStorage.getItem('loggedInUser')
  const token = loggedInUser ? JSON.parse(loggedInUser).token : null

  return fetch(process.env.NEXT_PUBLIC_API_URL + "/users", {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
      },
  })
}


const UserService = {
  loginUser, signupUser, getAllUsers
}      
    
export default UserService