import { User } from "../model/user"
import { UserInput } from "../types";
import database from "../util/database";

const registerUser = async (newUser: UserInput) => {
    try{
        const userPrisma = await database.user.create({
            data:{
                username: newUser.username,
                password: newUser.password,
                email: newUser.email
            }          
        });
        return User.from(userPrisma);
    } catch(e){
        throw new Error("DB Error");
    }
}

const findById = async (id: number) => {
    try{
        const userPrisma = await database.user.findFirst({
            where: {id},
            include:{
                lists: {
                    include: {
                        author: true,
                        likes: true
                    }
                },
                reviews: {
                    include: {
                        author: true,
                        comments: {
                            include: {
                                author: true
                            }
                        },
                        likes: true
                    }
                }
            }
        });
        if(userPrisma) 
            return User.from(userPrisma);
        else
            throw new Error("User doesn't Exist");

    }catch(e){
        throw new Error("DB Error");
    }
}

const findByEmail = async (email: string) => {
    try{
        const userPrisma = await database.user.findFirst({
            where: {email},
        });
        if(userPrisma) 
            return User.from(userPrisma);
        else
            throw new Error("User doesn't Exist");

    }catch(e){
        throw new Error("DB Error");
    }
}

export default {
    registerUser,
    findByEmail,
    findById,
}
