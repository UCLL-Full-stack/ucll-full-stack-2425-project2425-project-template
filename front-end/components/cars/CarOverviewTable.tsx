import React from 'react';
import { Car } from '../../types';
import CarService from '@/services/CarService';



type Props = {
    cars: Array<Car>;
    selectCar: (car: Car) => void;
    };

const CarOverviewTable: React.FC<Props> = ({ cars, selectCar }: Props) => {
    return (
        <>
        {cars && (
            <table className="table table-hover">
            <thead>
                <tr>
                <th scope="col">Brand</th>
                <th scope="col">Model</th>
                <th scope="col">Year</th>
                <th scope="col">License plate</th>
                <th scope="col">Price</th>
                </tr>
            </thead>
            <tbody>
                {cars.map((car, index) => (
                <tr key={index} onClick={() => selectCar(car)}
                    className="border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-between cursor-pointer hover:bg-gray-100 transition">
                    <td>{car.brand}</td>
                    <td>{car.model}</td>
                    <td>{car.year}</td>
                    <td>{car.licensePlate}</td>
                    <td>{car.price}</td>
                    <td>
                    <button onClick={(e) => {
                        e.stopPropagation();
                        if (car.id !== undefined) {
                            CarService.deleteCar(car.id).then(() => {
                                window.location.reload();
                            }).catch((error) => {
                                console.error("Failed to delete car:", error);
                            });
                        } else {
                            console.error("Car ID is undefined");
                        }
                    }} className="mt-2 px-4 py-2 bg-red-500 text-white font-bold rounded hover:bg-red-600 transition">
                        Remove
                    </button>
                    </td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
        </>
    );
}
export default CarOverviewTable;