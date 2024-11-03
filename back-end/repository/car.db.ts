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
const deleteCarById = (id: number): Car[] => {
    const newCars = cars.filter((car) => car.getId() !== id);
    return cars = newCars
};
export default {getAllCars, deleteCarById};