import { de } from "date-fns/locale";
import { Vehicle } from "../domain/model/vehicle";
import { Prisma, PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

const cars: Vehicle[] = [
    new Vehicle({ manufacturer: "Toyota", model_name: "Corolla", price: 19900, fuelType: "Gasoline", transmissionType: "Automatic", year: 2019, bodyType: "Sedan", vehicleType: "Car", mileage: 10000, engineCapacity: 2000 }),
    new Vehicle({ manufacturer: "Toyota", model_name: "Camry", price: 18500, fuelType: "Hybrid (Electric/Gasoline)", transmissionType: "Automatic", year: 2020, bodyType: "Sedan", vehicleType: "Car", mileage: 10000, engineCapacity: 3500 }),
    new Vehicle({ manufacturer: "Lexus", model_name: "ISF", price: 33200, fuelType: "Gasoline", transmissionType: "Automatic", year: 2015, bodyType: "Sedan", vehicleType: "Car", mileage: 10000, engineCapacity: 5000 }),
    new Vehicle({ manufacturer: "BMW", model_name: "5 Series", price: 35300, fuelType: "Gasoline", transmissionType: "Automatic", year: 2019, bodyType: "Sedan", vehicleType: "Car", mileage: 10000, engineCapacity: 3000 }),
];

const createVehicle = ({
    manufacturer,
    model_name,
    price,
    fuelType,
    transmissionType,
    bodyType,
    year,
    vehicleType,
    mileage,
    engineCapacity,
    createdAt,
    updatedAt
}: Vehicle): Vehicle => {

    const newCar = new Vehicle({

        manufacturer,
        model_name,
        price,
        fuelType,
        transmissionType,
        year,
        vehicleType,
        bodyType,
        mileage,
        engineCapacity,
        createdAt,
        updatedAt

    });

    cars.push(newCar);

    return newCar;
}

function findVehicleById(id: number): Vehicle | undefined {
    return cars.find(vehicle => vehicle.id === id);
}

const deleteVehicleFromDatabase = (vehicleId: number): boolean => {
    const index = cars.findIndex(vehicle => vehicle.id === vehicleId);
    if (index !== -1) {
        cars.splice(index, 1);
        return true;
    }
    return false;
};

const updateVehicle = (vehicleId: number, newVehicleData: Vehicle): Vehicle => {

    //finds the index of the car so you can replace it in the list
    const vehicleIndex = cars.findIndex(vehicle => vehicle.id === vehicleId);

    const oldVehicle = findVehicleById(vehicleId)

    const updatedVehicle = new Vehicle({
        manufacturer: newVehicleData.manufacturer,
        model_name: newVehicleData.model_name,
        price: newVehicleData.price,
        fuelType: newVehicleData.fuelType,
        transmissionType: newVehicleData.transmissionType,
        year: newVehicleData.year,
        vehicleType: newVehicleData.vehicleType,
        engineCapacity: newVehicleData.engineCapacity,
        bodyType: newVehicleData.bodyType,
        mileage: newVehicleData.mileage,
        id: oldVehicle?.id,
        createdAt: oldVehicle?.createdAt,
        updatedAt: new Date()

    });

    cars[vehicleIndex] = updatedVehicle;

    return updatedVehicle;
};

const filterCars = (filters: any) => {
    const filterObject: any = {
        manufacturer: filters.manufacturer || undefined,
        model_name: filters.model_name || undefined,
        fuelType: filters.fuelType || undefined,
        transmissionType: filters.transmissionType || undefined,
        bodyType: filters.bodyType || undefined,
        vehicleType: filters.vehicleType || undefined,
        price: filters.min_price || filters.max_price ? {
            gte: filters.min_price || undefined,
            lte: filters.max_price || undefined
        } : undefined,
        year: filters.min_year || filters.max_year ? {
            gte: filters.min_year || undefined,
            lte: filters.max_year || undefined
        } : undefined,
        mileage: filters.min_mileage || filters.max_mileage ? {
            gte: filters.min_mileage || undefined,
            lte: filters.max_mileage || undefined
        } : undefined
    };
    Object.keys(filterObject).forEach((key) => {
        if (filterObject[key] === undefined) delete filterObject[key]
    });

    return prisma.vehicle.findMany({ where: filterObject });

}

const getAllCars = (): Vehicle[] => cars;

// const getVehicleBySeller = (sellerId: number): Vehicle[] => {
//     return cars.filter(vehicle => vehicle.sellerId === sellerId);
// }

export default {
    getAllCars,
    createVehicle,
    findVehicleById,
    deleteVehicleFromDatabase,
    updateVehicle,
    filterCars,
    // getVehicleBySeller
}
