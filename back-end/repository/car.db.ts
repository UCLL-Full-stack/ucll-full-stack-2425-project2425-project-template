import { Car } from "../model/Car";

const cars = [
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
export default {getAllCars};