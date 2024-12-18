import { Pokemon, Trainer, User } from '@types';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const UserService = {
    logIn: async(email:string,password:string) => {
        return fetch(`${API_URL}/users/login`,{
          method: "POST",
          headers: {"content-type" : 'application/json'},
          body: JSON.stringify({
            email:email,
            password:password
          })
        });
      }
    }

export default UserService;