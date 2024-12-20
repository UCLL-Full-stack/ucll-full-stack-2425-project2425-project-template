import { User } from "@/types";

const registerUser = async (user: User) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        const data = await response.json();
        if (response.ok) {
            sessionStorage.setItem("authToken", data.token);
        }
        return data;
    } catch (error) {
        return error;
    }
};

const loginUser = async (email: string, password: string) => {
    try {
        const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (response.ok) {
            sessionStorage.setItem("authToken", data.token);
        }
        return data;
    } catch (error) {
        return error;
    }
};

const RegisterLoginService = {
    registerUser,
    loginUser,
};

export default RegisterLoginService;