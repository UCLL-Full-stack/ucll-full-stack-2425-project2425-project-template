import { User, UserLogin } from "@/types";

const loginUser = async ({name, password}: UserLogin) => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    sessionStorage.setItem("name", name);
  
    return fetch(apiUrl + "/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        password,
      }),
    });
  };

const createUser = (user: User) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
}

const UserService = {
    loginUser,
    createUser,
};

export default UserService;