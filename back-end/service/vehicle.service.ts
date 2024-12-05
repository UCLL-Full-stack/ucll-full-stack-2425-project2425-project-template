import { Vehicle } from "../domain/model/vehicle";
import { Car } from "../domain/model/car";
import { VehicleInput } from "../types";
import vehicleDB from "../repository/vehicle.db";
import { id } from "date-fns/locale";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
});




const addVehicle = async (input: VehicleInput) => {

    if (!input.manufacturer || 
        !input.model_name || 
        !input.price || 
        !input.bodyType ||
        !input.fuelType || 
        !input.transmissionType || 
        !input.year || 
        input.mileage == null ||
        !input.vehicleType || 
        !input.engineCapacity) {

        throw new Error('All vehicle properties must be defined');
    }

    try {
        const newVehicle = await prisma.vehicle.create({
            data: {
                manufacturer: input.manufacturer,
                model_name: input.model_name,
                price: input.price,
                fuelType: input.fuelType,
                transmissionType: input.transmissionType,
                year: input.year,
                vehicleType: input.vehicleType,
                bodyType: input.bodyType,
                mileage: input.mileage,
                engineCapacity: input.engineCapacity,
                createdAt: new Date(),
                updatedAt: new Date()
            },
        });

        if (input.vehicleType === "Motorcycle") {
            const NewMotorcycle = await prisma.motorcycle.create({
                data: {
                    manufacturer: input.manufacturer,
                    model_name: input.model_name,
                    price: input.price,
                    fuelType: input.fuelType,
                    transmissionType: input.transmissionType,
                    year: input.year,
                    vehicleType: input.vehicleType,
                    bodyType: input.bodyType,
                    mileage: input.mileage,
                    engineCapacity: input.engineCapacity,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    vehicleId: newVehicle.id
                },  
            })
        } else { 
            const NewCar = await prisma.car.create({
                data: {
                    manufacturer: input.manufacturer,
                    model_name: input.model_name,
                    price: input.price,
                    fuelType: input.fuelType,
                    transmissionType: input.transmissionType,
                    year: input.year,
                    vehicleType: input.vehicleType,
                    bodyType: input.bodyType,
                    mileage: input.mileage,
                    engineCapacity: input.engineCapacity,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    vehicleId: newVehicle.id

                },  
            })
        }
        return newVehicle;
    } catch (error) {
        console.error('Error creating vehicle:', error);
        throw error;
    }
};

export const getVehicleById = async (id: number) => {
    try {
        const vehicle = await prisma.vehicle.findUnique({
            where: { id },
        });
        return vehicle;
    } catch (error) {
        console.error('Error fetching vehicle by ID:', error);
        throw error;
    }
};


const deleteVehicle = async (vehicleId: number) => {
    
    const vehicle = await prisma.vehicle.findUnique({
        where: { id: vehicleId }
    });

    if (!vehicle) {
        throw new Error(`There is no vehicle with id ${vehicleId} in the database`);
    }

    try {

        await prisma.vehicle.delete({
            where: { id: vehicleId }
        });

        console.log(`Vehicle with ID ${vehicleId} and its associated records deleted successfully.`);
    } catch (error: any) {
        console.error('Error during vehicle deletion:', error);
        throw new Error(`Cannot delete this vehicle: ${error.message}`);
    }

    return { message: "Vehicle and its associated records successfully deleted" };
};





const editVehicle =  async (vehicleId: number, input: VehicleInput): Promise<Vehicle> => {

    if (
        !input.manufacturer ||
        !input.model_name ||
        !input.price ||
        !input.bodyType ||
        !input.fuelType ||
        !input.transmissionType ||
        !input.year ||
        input.mileage == null ||
        !input.vehicleType ||
        !input.engineCapacity
    ) {
        throw new Error("All vehicle properties must be defined");
    }

    const existingVehicle = await getVehicleById(vehicleId)
    if (!existingVehicle) {
        throw new Error("This vehicle cannot be found");
    }

    const updatedDataVehicle = await prisma.vehicle.update({
        where: { id: vehicleId },
        data: {
            manufacturer: input.manufacturer,
            model_name: input.model_name,
            price: input.price,
            fuelType: input.fuelType,
            transmissionType: input.transmissionType,
            year: input.year,
            vehicleType: input.vehicleType,
            bodyType: input.bodyType,
            mileage: input.mileage,
            engineCapacity: input.engineCapacity,
            updatedAt: new Date(),
        },
    });

    if (input.vehicleType === "Motorcycle") {
        const updatedDataMotorcycle = await prisma.motorcycle.update({
            where: { vehicleId: vehicleId },
            data: {
                manufacturer: input.manufacturer,
                model_name: input.model_name,
                price: input.price,
                fuelType: input.fuelType,
                transmissionType: input.transmissionType,
                year: input.year,
                vehicleType: input.vehicleType,
                bodyType: input.bodyType,
                mileage: input.mileage,
                engineCapacity: input.engineCapacity,
                createdAt: existingVehicle.createdAt,
                updatedAt: new Date(),
            },
        });
    } else {
        const updatedDataCar = await prisma.car.update({
            where: { vehicleId: vehicleId },
            data: {
                manufacturer: input.manufacturer,
                model_name: input.model_name,
                price: input.price,
                fuelType: input.fuelType,
                transmissionType: input.transmissionType,
                year: input.year,
                vehicleType: input.vehicleType,
                bodyType: input.bodyType,
                mileage: input.mileage,
                engineCapacity: input.engineCapacity,
                createdAt: existingVehicle.createdAt,
                updatedAt: new Date(),
            },
        });
    }


    return new Vehicle(updatedDataVehicle); 
}





const getFilteredVehicles = async (filters: any) => {
    return await vehicleDB.filterCars(filters);
}


const getAllCars = async () => {
    try {
        const cars = await prisma.car.findMany();
        return cars;
    } catch (error) {
        console.error('Error fetching cars:', error);
        throw error;
    }
};

const getAllVehicles = async () => {
    try {
        const vehicles = await prisma.vehicle.findMany();
        return vehicles;
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        throw error;
    }
};

const getAllMotorcycles = async () => {
    try {
        const motorcycles = await prisma.motorcycle.findMany();
        return motorcycles;
    } catch (error) {
        console.error('Error fetching motorcycles:', error);
        throw error;
    }
};




export default {
    getAllCars,
    getAllMotorcycles,
    getAllVehicles,
    addVehicle,
    deleteVehicle,
    editVehicle,
    getFilteredVehicles,
    getVehicleById
}