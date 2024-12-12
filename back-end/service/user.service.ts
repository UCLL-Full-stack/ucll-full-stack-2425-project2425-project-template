import userDb from "../repository/user.db"

const getUserById = ({userId}: {userId:number}) =>{
    const user = userDb.getUserById({id: userId})
    if(!user){
        throw  new Error(`user with id: ${userId} does not exist.`)
    }
    return user;
}

export default {
    getUserById
}