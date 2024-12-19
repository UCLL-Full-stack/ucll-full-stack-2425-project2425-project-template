import React from "react";
import { Car } from "../../types";
import CarService from "@/services/CarService";
import { useToast } from "@/src/hooks/use-toast";
import { Toaster } from "@/src/components/ui/toaster";
import { useRouter } from "next/router";
import { Trash2 } from "lucide-react";

type Props = {
  cars: Array<Car>;
  selectCar: (car: Car) => void;
};

const CarOverviewTable: React.FC<Props> = ({ cars, selectCar }: Props) => {
    
    const router = useRouter();
    const { toast } = useToast();

    const deleteCar = (e:Event,car:Car) => {
      e.stopPropagation();
      if (car.id !== undefined) {
        CarService.deleteCar(car.id)
          .then(() => {
            window.location.reload();
          })
          .catch((error) => {
            console.error("Failed to delete car:", error);
          });
      } else {
        console.error("Car ID is undefined");
      }
      }

    return (
    <>
      {cars && (
        <table className="table table-hover">
          <thead>
            <tr>
              <th className="px-5" scope="col">
                Brand
              </th>
              <th className="px-5" scope="col">
                Model
              </th>
              <th className="px-5" scope="col">
                Year
              </th>
              <th className="px-5" scope="col">
                License plate
              </th>
              <th className="px-2" scope="col">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {cars.map((car, index) => (
              <tr
                key={index}
                onClick={() => selectCar(car)}
                className="border border-gray-300 rounded-lg transition"
              >
                <td className="px-5">{car.brand}</td>
                <td className="px-5">{car.model}</td>
                <td className="px-5">{car.year}</td>
                <td className="px-5">{car.licensePlate}</td>
                <td className="px-2">{car.price}</td>
                <td>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (car.id !== undefined) {
                        CarService.deleteCar(car.id)
                          .then(() => {
                            toast({
                              title: "Success",
                              description: "Car deleted successfully",
                            });
                            window.location.reload();
                          })
                          .catch((error) => {
                            console.error("Failed to delete car:", error);
                          });
                      } else {
                        console.error("Car ID is undefined");
                      }
                    }}
                    className="mt- px-2 py-2 bg-[#ff8921] hover:bg-[#ff642bbb] rounded "
                  >
                    <Trash2 className="text-black"/>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};
export default CarOverviewTable;
