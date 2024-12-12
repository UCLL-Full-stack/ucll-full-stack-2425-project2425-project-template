import { User } from "@/types";

const loginUser = async (user: User) => {
  return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userName: user.userName,
      role: user.role,
      password: user.password,
    }),
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
