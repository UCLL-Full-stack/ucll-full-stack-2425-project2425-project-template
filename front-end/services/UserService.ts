import { User } from "@/types";

const createUser = async (user :User): Promise<void> => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body:  JSON.stringify(user),
    });
}

const UserService = {
    createUser
}

export default UserService;