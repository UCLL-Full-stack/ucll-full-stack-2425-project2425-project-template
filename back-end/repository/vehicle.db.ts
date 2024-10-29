import { de } from "date-fns/locale";
import { Vehicle } from "../domain/model/vehicle";

const cars: Vehicle[] = [
    new Vehicle({id:1, manufacturer: "Toyota", model_name: "Corolla", price: 20000, fuel_type: "Petrol", transmission_type: "Automatic", year: 2019, vehicle_type: "Car"}),
    new Vehicle({id:2, manufacturer: "Toyota", model_name: "Camry", price: 30000, fuel_type: "Petrol", transmission_type: "Automatic", year: 2020, vehicle_type: "Car"}),
];

const createVehicle = (
    { manufacturer, model_name, price, fuel_type, transmission_type, year, vehicle_type }
    : Vehicle): Vehicle => {
    const newCar = new Vehicle({
         manufacturer, model_name, price,
        fuel_type, transmission_type, year, vehicle_type
    });
    cars.push(newCar);
    return newCar;
}


const getAllCars = (): Vehicle[] => cars;

export default { getAllCars, createVehicle }
