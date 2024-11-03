import React from 'react';
import { Car } from '../../types';



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
                <tr key={index} onClick={() => selectCar(car)} role="button">
                    <td>{car.brand}</td>
                    <td>{car.model}</td>
                    <td>{car.year}</td>
                    <td>{car.licensePlate}</td>
                    <td>{car.price}</td>
                </tr>
                ))}
            </tbody>
            </table>
        )}
        </>
    );
}
export default CarOverviewTable;