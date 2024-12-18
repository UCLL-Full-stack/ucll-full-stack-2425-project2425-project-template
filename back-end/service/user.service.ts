import { User } from "../domain/model/user";
import { UserInput } from "../types";
import bcrypt from "bcrypt";
import { generateToken } from "../types/util/token";
import userDb from "../repository/user.db";
import vehicleDb from "../repository/vehicle.db";

const getAllUsers = async (): Promise<User[]> => userDb.getAllUsers();


const findUserById = async (userId: number) => {
  return userDb.findUserById(userId);
};

const addFavouriteCar = async (userId: number, vehicleId: number) => {

  const user = await userDb.findUserById(userId)
  const vehicle = await vehicleDb.findVehicleById(vehicleId)

  if (!user) {
    throw new Error(`User with id ${userId} does not exist`)
  } else if (!vehicle) {
    throw new Error(`Vehicle with id ${vehicleId} does not exist`)
  }

  return userDb.addFavouriteCar(userId, vehicleId)     
};
  
const getFavouriteCars = async (userId: number) => {

  const user = await userDb.findUserById(userId)

  if (!user) {
    throw new Error(`User with id ${userId} does not exist`)
  }

  return userDb.getFavouriteCars(userId)
};
  
const removeFavouriteCar = async (userId: number, vehicleId: number) => {

  const user = await userDb.findUserById(userId)
  const vehicle = await vehicleDb.findVehicleById(vehicleId)

  if (!user) {
    throw new Error(`User with id ${userId} does not exist`)
  } else if (!vehicle) {
    throw new Error(`Vehicle with id ${vehicleId} does not exist`)
  }
 
  return userDb.removeFavouriteCar(userId, vehicleId)
};
export default { getAllUsers, findUserById, getFavouriteCars, addFavouriteCar, removeFavouriteCar };