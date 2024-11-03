import carDb from "../repository/car.db";
import { Car } from "../model/Car";

const getAllCars = (): Car[] => carDb.getAllCars();
const deleteCarById = (id: number): Car[] => carDb.deleteCarById(id);
const addCar = (carData: {
    model: string;
    brand: string;
    year: number;
    licensePlate: string;
    price: number;
}): Car => {
    return carDb.addCar(carData);
};

export default {getAllCars, deleteCarById, addCar,};