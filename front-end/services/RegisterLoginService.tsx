import { User } from "@/types";

const registerUser = (user: User) => {
    try {
        return fetch(process.env.NEXT_PUBLIC_API_URL + "/users/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        
    } catch (error) {
        return error
    }
};

const RegisterLoginService = {
    registerUser,
};

export default RegisterLoginService;