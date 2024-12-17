import { User } from "@types";

const login = async (user: User) => {
    return fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });
};

const AuthService = {
    login,
}

export default AuthService;