import { User } from "@types";
const apiUrl = "http://localhost:3000";

export const UserService = {
    getUserByEmail: async (email: string) => {
        try {
            const res = await fetch(apiUrl + `/users/email/${email}`, {
                method: "GET",
                headers: {
                    "Accept": "application/json",
                },
            });
            if (!res.ok) {
                throw new Error(`User not found: ${email}`);
            }
            return await res.json();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error fetching user: ${error.message}`);
            } else {
                throw new Error('An unknown error occurred while fetching the user.');
            }
        }
    },

    registerUser: async (user: User) => {
        try {
            const res = await fetch(apiUrl + "/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            });
            if (!res.ok) {
                throw new Error('Registration failed');
            }
            return await res.json();
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Error: ${error.message}`);
            } else {
                throw new Error('It aint work, idk why.');
            }
        }
    }
};
