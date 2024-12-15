import userDb from '../repository/user.db';

const getAllUsers = async () => {
    try {
        const users = await userDb.getAllUsers();
        
        if (!users || users.length === 0) {
            throw new Error("No users found.");
        }

        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Failed to retrieve users.");
    }
}


export default {
    getAllUsers
};