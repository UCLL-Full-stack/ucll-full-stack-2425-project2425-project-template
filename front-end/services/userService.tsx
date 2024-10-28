import { User } from "@/types"
const URL = "http://localhost:3000/";


const registerUser = (user: User) => {
  
  return fetch(`${URL}users/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
}

const userService = {
  registerUser
}

export default userService;