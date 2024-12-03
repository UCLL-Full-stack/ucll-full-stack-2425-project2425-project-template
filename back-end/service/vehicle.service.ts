import { Vehicle } from "../domain/model/vehicle";
import { VehicleInput } from "../types";
import vehicleDB from "../repository/vehicle.db";
import { id } from "date-fns/locale";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();



export const addVehicle = async (input: VehicleInput) => {
    if (!input.manufacturer || !input.model_name || !input.price || !input.bodyType ||
        !input.fuelType || !input.transmissionType || !input.year || !input.mileage ||
        !input.vehicleType || !input.engineCapacity) {
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
    const vehicle = await (vehicleId)
    
    if(!vehicle) {
        throw new Error ("vehicle cannot be found")
    }

    try {
        await prisma.vehicle.delete({
            where: { id: vehicleId }
        })
        
    } catch (error) {
        throw new Error("cannot delete this vehicle")        
    }

    return await getAllCars()
};



const editVehicle = async (vehicleId: number, input: VehicleInput): Promise<Vehicle> => {
   
    if (
        !input.manufacturer ||
        !input.model_name ||
        !input.price ||
        !input.bodyType ||
        !input.fuelType ||
        !input.transmissionType ||
        !input.year ||
        !input.mileage ||
        !input.vehicleType ||
        !input.engineCapacity
    ) {
        throw new Error("All vehicle properties must be defined");
    }

    const oldVehicle = await getVehicleById(vehicleId)

    if (!oldVehicle) {
        throw new Error("This vehicle cannot be found");
    }

    await prisma.vehicle.update({
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
            createdAt: oldVehicle.createdAt,
            updatedAt: new Date(),
        },
    });

    const updatedVehicle = await getVehicleById(vehicleId)

    return updatedVehicle;
};


const getFilteredVehicles = async (filters: any) => {
    return await vehicleDB.filterCars(filters);
}


export const getAllCars = async () => {
    try {
        const vehicles = await prisma.vehicle.findMany();
        return vehicles;
    } catch (error) {
        console.error('Error fetching vehicles:', error);
        throw error;
    }
};

export default {
    getAllCars,
    addVehicle,
    deleteVehicle,
    editVehicle,
    getFilteredVehicles,
    getVehicleById
}