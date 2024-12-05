import { User } from "@/types";
import { userInfo } from "os";

const loginUser = async (user: User) => {
  console.log("in frontend: " + user);
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userName: user.userName, password: user.password }),
  });
};

const registerUser = (user: User) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
};

export default { loginUser, registerUser };
