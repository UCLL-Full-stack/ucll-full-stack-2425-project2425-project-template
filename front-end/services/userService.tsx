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

const loginUser = ({name, password}: {name: string, password: string}) => {
  return fetch(`${URL}users/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({name, password}),
  })
}

const userService = {
  registerUser,
  loginUser,
}

export default userService;