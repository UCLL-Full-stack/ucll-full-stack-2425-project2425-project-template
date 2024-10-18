import { Vehicle } from "../domain/model/vehicle";
import { VehicleInput } from "../types";
import vehicleDB from "../repository/vehicle.db";

// const createVehicle = async (input: VehicleInput): Promise<Vehicle> => vehicleDB.createVehicle(input);


const getAllCars = async (): Promise<Vehicle[]> => vehicleDB.getAllCars();