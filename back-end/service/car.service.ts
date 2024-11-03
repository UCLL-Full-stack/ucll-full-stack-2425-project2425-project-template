import carDb from "../repository/car.db";
import { Car } from "../model/Car";

const getAllCars = (): Car[] => carDb.getAllCars();
const deleteCarById = (id: number): Car[] => carDb.deleteCarById(id);

export default {getAllCars, deleteCarById,};