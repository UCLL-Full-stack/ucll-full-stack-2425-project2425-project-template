import carDb from "../repository/car.db";
import { Car } from "../model/Car";

const getAllCars = (): Car[] => carDb.getAllCars();

export default {getAllCars,};