import { de } from "date-fns/locale";
import { Vehicle } from "../model/vehicle";

const cars: Vehicle[] = [];

const createVehicle = ({ id, manufacturer, model_name, price, fuel_type, transmission_type, year, vehicle_type }: Vehicle): Vehicle => {
    const newCar = new Vehicle({
        id, manufacturer, model_name, price,
        fuel_type, transmission_type, year, vehicle_type
    });
    cars.push(newCar);
    return newCar;
}


const getAllCars = (): Vehicle[] => cars;

export default { getAllCars, createVehicle }

