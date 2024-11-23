import carDb from "../repository/car.db";
import { Car } from "../model/Car";
import { CarInput } from "../types";

const getAllCars = async (): Promise<Car[]> => carDb.getAllCars();

const deleteCarById = async (id: number): Promise<Car> => carDb.deleteCarById(id);

const addCar = async ({
    model,
    brand,
    year,
    licensePlate,
    price,
}: CarInput): Promise<Car> => {
    const car = new Car({ model, brand, year, licensePlate, price });
    return carDb.addCar(car);
}

export default {getAllCars, deleteCarById, addCar};