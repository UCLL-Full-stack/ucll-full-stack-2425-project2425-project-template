import { de } from "date-fns/locale";
import { Vehicle } from "../domain/model/vehicle";

const cars: Vehicle[] = [
    new Vehicle({id:1, manufacturer: "Toyota", model_name: "Corolla", price: 20000, fuel_type: "Petrol", transmission_type: "Automatic", year: 2019, body_type: "Sedan", vehicle_type: "Car"}),
    new Vehicle({id:2, manufacturer: "Toyota", model_name: "Camry", price: 30000, fuel_type: "Petrol", transmission_type: "Automatic", year: 2020, body_type: "Sedan",vehicle_type: "Car"}),
];

const createVehicle = (
    { manufacturer, model_name, price, fuel_type, transmission_type, body_type, year, vehicle_type }
    : Vehicle): Vehicle => {
    const newCar = new Vehicle({
         manufacturer, model_name, price,
        fuel_type, transmission_type, year, vehicle_type, body_type
    });
    cars.push(newCar);
    return newCar;
}

const deleteVehicleFromDatabase = (vehicleId: number): boolean => {
    const index = cars.findIndex(vehicle => vehicle.id === vehicleId);
    if (index !== -1) {
        cars.splice(index, 1); // Remove vehicle if found
        return true;
    }
    return false;
};

const updateVehicle = (vehicleId: number, newVehicleData: Vehicle): Vehicle => {
    
    const vehicleIndex = cars.findIndex(vehicle => vehicle.id === vehicleId);

    if (vehicleIndex === -1) {
        throw new Error("Vehicle not found");
    }

    const updatedVehicle = new Vehicle({
        manufacturer: newVehicleData.manufacturer,
        model_name: newVehicleData.model_name,
        price: newVehicleData.price,
        fuel_type: newVehicleData.fuel_type,
        transmission_type: newVehicleData.transmission_type,
        year: newVehicleData.year,
        vehicle_type: newVehicleData.vehicle_type,
        body_type: newVehicleData.body_type,
        id: vehicleId 
    });

    cars[vehicleIndex] = updatedVehicle;

    return updatedVehicle;
};




const getAllCars = (): Vehicle[] => cars;

export default { getAllCars, createVehicle, deleteVehicleFromDatabase, updateVehicle}
