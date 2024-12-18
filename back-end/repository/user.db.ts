
import { PrismaClient } from "@prisma/client";
import { User } from "../domain/model/user";
import database from "./database";

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});


const getAllUsers = async (): Promise<User[]> => {
    try{
        const usersPrisma = await database.user.findMany({
            include: {listOfCarsForSelling: true},
        })
        return usersPrisma.map((userPrisma) => User.from(userPrisma));
    }catch(error){
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
    
};
const findUserById = async (userId: number) => {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
  
    if (!user) {
      throw new Error(`User with id ${userId} does not exist`);
    }
  
    return user;
};

const getFavouriteCars = async (userId: number) => {
    const favourites = await prisma.favouriteCars.findMany({
      where: { userId },
      include: { vehicle: true },
    });
    return favourites.map((fav) => fav.vehicle);
};
  

const addFavouriteCar = async (userId: number, vehicleId: number) => {
    return prisma.favouriteCars.create({
      data: { userId, vehicleId },
    });
};

const removeFavouriteCar = async (userId: number, vehicleId: number) => {
    return prisma.favouriteCars.delete({
      where: { userId_vehicleId: { userId, vehicleId } },
    });
};


export default { getAllUsers, removeFavouriteCar, getFavouriteCars, addFavouriteCar, findUserById };