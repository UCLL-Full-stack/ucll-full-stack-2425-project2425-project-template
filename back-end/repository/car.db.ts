import { Car } from "../model/Car";

let cars = [
    new Car({
        id: 1,
        model: "Model S",
        brand: "Tesla",
        year: 2020,
        licensePlate: "ABC123",
        price: 80000,
    }),
]
const getAllCars = (): Car[] => cars;
const addCar = (carData: {
    model: string;
    brand: string;
    year: number;
    licensePlate: string;
    price: number;
}): Car => {
    const newId = cars.length > 0 ? cars.length + 1 : 1;
    const newCar = new Car({
        id: newId,
        ...carData,
    });
    cars.push(newCar);
    return newCar;
};
const deleteCarById = (id: number): Car[] => {
    const newCars = cars.filter((car) => car.getId() !== id);
    return cars = newCars
};
export default {getAllCars, deleteCarById, addCar,};