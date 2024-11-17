import { de } from "date-fns/locale";
import { Vehicle } from "../domain/model/vehicle";

const cars: Vehicle[] = [
    new Vehicle({id:1, manufacturer: "Toyota", model_name: "Corolla", price: 19900, fuel_type: "Gasoline", transmission_type: "Automatic", year: 2019, body_type: "Sedan", vehicle_type: "Car", mileage: 10000}),
    new Vehicle({id:2, manufacturer: "Toyota", model_name: "Camry", price: 18500, fuel_type: "Hybrid (Electric/Gasoline)", transmission_type: "Automatic", year: 2020, body_type: "Sedan",vehicle_type: "Car", mileage: 10000 }),
    new Vehicle({id:2, manufacturer: "Lexus", model_name: "ISF", price: 33200, fuel_type: "Gasoline", transmission_type: "Automatic", year: 2015, body_type: "Sedan",vehicle_type: "Car", mileage: 10000}),
    new Vehicle({id:2, manufacturer: "BMW", model_name: "5 Series", price: 35300, fuel_type: "Gasoline", transmission_type: "Automatic", year: 2019, body_type: "Sedan",vehicle_type: "Car", mileage: 10000}),
];

const createVehicle = (
    { manufacturer, model_name, price, fuel_type, transmission_type, body_type, year, vehicle_type, mileage}
    : Vehicle): Vehicle => {
    const newCar = new Vehicle({
         manufacturer, model_name, price,
        fuel_type, transmission_type, year, vehicle_type, body_type, mileage
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
        mileage:newVehicleData.mileage,
        id: vehicleId
    });

    cars[vehicleIndex] = updatedVehicle;

    return updatedVehicle;
};




const getAllCars = (): Vehicle[] => cars;

export default { getAllCars, createVehicle, deleteVehicleFromDatabase, updateVehicle}
