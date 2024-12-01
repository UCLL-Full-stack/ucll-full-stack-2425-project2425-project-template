
import {UserInput} from "../types";

// const loginUser = (id: number) => {
//     return fetch(process.env.NEXT_PUBLIC_API_URL+"/users/login", {
//       method: "POST",
//       headers: {
//         "Content-Type" : "application/json",
//       }
//     } )
//   }
  
  
  async function addUser(user : Object) {
      try {
        await fetch(process.env.NEXT_PUBLIC_API_URL+ "/users/signup", {
          method: "POST",
          headers: {
            "Content-Type" : "application/json",
          },
          body: JSON.stringify(user)
        } );
      } catch (error) {
        console.error('Error adding user:', error);
        throw new Error('Failed to add user');
      }
    }
    
    async function getUser(id : string) {
      const storedToken: string | null = sessionStorage.getItem('loggedInUser');
      try {
        const token = storedToken ? JSON.parse(storedToken)?.token : undefined;
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL+`/users/${id}`, {
          method: "GET",
          headers: {
            "Content-Type" : "application/json",
            Authorization:`Bearer ${token}`
          },
        } );
        return response
      } catch (error) {
        console.error('Error getting user:', error);
        throw new Error('Failed to retrieve user');
      }
    }
    

    async function deleteUser(rnummer : string) {
        const storedToken: string | null = sessionStorage.getItem('loggedInUser');
        try {
          const token = storedToken ? JSON.parse(storedToken)?.token : undefined;
          console.log(token)
          return await fetch(process.env.NEXT_PUBLIC_API_URL+ `/users/deleteUserAndLinkedPersonAndChatsAndMessagesByRnummer/${rnummer}`, {
            method: "DELETE",
            headers: {
              "accept": 'application/json',
              "Content-Type" : "application/json",
              "Authorization":`Bearer ${token}`
            },
           
          } );
        } catch (error) {
          console.error('Error adding person:', error);
          throw new Error('Failed to add person');
        }
      }
    
      async function getAllUsers() {
        const storedToken: string | null = sessionStorage.getItem('loggedInUser');
        try{
            const token = storedToken ? JSON.parse(storedToken)?.token : undefined;
            console.log(token)
          const response = await fetch(process.env.NEXT_PUBLIC_API_URL+`/users`, {
            method: "GET",
            headers: {
              "Content-Type" : "application/json",
              Authorization:`Bearer ${token}`
            },
          } );
          return response
        } catch (error) {
          console.error('Error getting user:', error);
          throw new Error('Failed to retrieve user');
        }
      }
      
    

    export {addUser, getUser, deleteUser, getAllUsers}