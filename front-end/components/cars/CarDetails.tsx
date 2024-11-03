import { Car } from "@/types";
import React from "react";


type Props = {
    car: Car;
    };

    const CarDetails: React.FC<Props> = ({ car }: Props) => {
        return (
          <>
            {car && (
              <table>
                <tr>
                  <td>ID:</td>
                  <td>{car.id}</td>
                </tr>
                <tr>
                  <td>Brand:</td>
                  <td>{car.brand}</td>
                </tr>
                <tr>
                  <td>Model:</td>
                  <td>{car.model}</td>
                </tr>
                <tr>
                  <td>Year:</td>
                  <td>{car.year}</td>
                </tr>
                <tr>
                  <td>License plate:</td>
                  <td>{car.licensePlate}</td>
                </tr>
                <tr>
                  <td>Price:</td>
                  <td>{car.price}</td>
                </tr>
              </table>
            )}
          </>
        );
      }
        export default CarDetails;