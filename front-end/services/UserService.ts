const apiUrl = "http://localhost:3000"

export const UserService = {

    getUserByEmail: async (email:string) => {
        const res = await fetch(apiUrl + `/users/email/${email}`);
        if(!res.ok) {
            throw new Error('User not found');
        }
        return res.json();
    }
};
