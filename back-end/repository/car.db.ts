import { Car } from "../model/Car";
import database from "../util/database";

const addCar = async (car : Car): Promise<Car> => {
    try {
        const carPrisma = await database.car.create({
            data: {
                model: car.getModel(),
                brand: car.getBrand(),
                year: car.getYear(),
                licensePlate: car.getLicensePlate(),
                price: car.getPrice()
            }
        });
        return Car.from(carPrisma);
    }
    catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getAllCars = async (): Promise<Car[]> => {
    try {
        const carsPrisma = await database.car.findMany();
        return carsPrisma.map((carPrisma) => Car.from(carPrisma));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const deleteCarById = async (id: number): Promise<Car> => {
    try {
        const carPrisma = await database.car.delete({
            where: {
                id
            }
        });
        return Car.from(carPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllCars,
    deleteCarById,
    addCar,
};