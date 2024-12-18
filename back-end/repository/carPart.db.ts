import { get } from "http";
import { CarPart } from "../model/CarPart";
import database from "../util/database";

const addCarPart = async ({name, price, quantity}:CarPart): Promise<CarPart> => {
    try {
        const carPartPrisma = await database.carPart.create({
            data: {
                name,
                price,
                quantity
            }
        });
        return CarPart.from(carPartPrisma);
    }
    catch (error) {
        console.error(error);
        throw new Error('Database error.');
    }
};

const getAllCarParts = async (): Promise<CarPart[]> => {
    try {
        const carPartsPrisma = await database.carPart.findMany();
        return carPartsPrisma.map(CarPart.from);
    }
    catch (error) {
        console.error(error);
        throw new Error('Database error.');
    }
};

export default {
    addCarPart,
    getAllCarParts,
};