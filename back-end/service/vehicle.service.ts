import { Vehicle } from "../domain/model/vehicle";
import { VehicleInput } from "../types";
import vehicleDB from "../repository/vehicle.db";
import { id } from "date-fns/locale";


const addVehicle = async (input: VehicleInput): Promise<Vehicle> => {
    if (!input.manufacturer || !input.model_name || !input.price || !input.bodyType ||
        !input.fuelType || !input.transmissionType || !input.year || !input.mileage || 
        !input.vehicleType || !input.engineCapacity || !input.engineCapacity) {
        throw new Error("All vehicle properties must be defined");
    }

    const vehicle = new Vehicle({
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
    });
    return vehicleDB.createVehicle(vehicle);
}


const deleteVehicle = async (vehicleId: number): Promise<void> => {
    const deleted = vehicleDB.deleteVehicleFromDatabase(vehicleId);
    if (!deleted) {
        throw new Error('Vehicle not found');
    }
};



const editVehicle = async (vehicleId: number, input: VehicleInput): Promise<Vehicle> => {
    if (!input.manufacturer || !input.model_name || !input.price || !input.bodyType ||
        !input.fuelType || !input.transmissionType || !input.year || !input.mileage||
        !input.vehicleType || !input.engineCapacity) {
        throw new Error("All vehicle properties must be defined");
    }


    const oldVehicle = vehicleDB.findVehicleById(vehicleId)

    if (oldVehicle === undefined) {
        throw new Error("This vehicle cannot be found")
    }

    const newVehicle = new Vehicle({
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
        id : oldVehicle.id,
        createdAt : oldVehicle.createdAt,
        updatedAt : new Date()

    })
    return vehicleDB.updateVehicle(vehicleId, newVehicle)
}


const getFilteredVehicles = async (filters: any) =>{
    return await vehicleDB.filterCars(filters);
}

const getAllCars = async (): Promise<Vehicle[]> => vehicleDB.getAllCars();

export default {
    getAllCars,
    addVehicle,
    deleteVehicle,
    editVehicle,
    getFilteredVehicles
}