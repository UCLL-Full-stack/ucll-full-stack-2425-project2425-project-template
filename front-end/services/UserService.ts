const getUserById = async (userId: string) => {
    return await fetch(process.env.NEXT_PUBLIC_API_URL + `/users/${userId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        }
    })
}

export const UserService = {
    getUserById
}