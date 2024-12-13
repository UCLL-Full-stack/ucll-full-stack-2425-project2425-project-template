import React from "react";
import { Vehicle } from "@/types";

type VehicleDetailsProps = {
    vehicle: Vehicle;
};

const VehicleDetails: React.FC<VehicleDetailsProps> = ({ vehicle }) => {
    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold">
                {vehicle.manufacturer} {vehicle.model_name}
            </h1>
            <p className="text-xl mt-2">Price: €{vehicle.price}</p>
            <ul className="mt-4">
                <li>
                    <strong>Year:</strong> {vehicle.year}
                </li>
                <li>
                    <strong>Mileage:</strong> {vehicle.mileage} KM
                </li>
                <li>
                    <strong>Fuel Type:</strong> {vehicle.fuelType}
                </li>
                <li>
                    <strong>Transmission:</strong> {vehicle.transmissionType}
                </li>
                <li>
                    <strong>Type:</strong> {vehicle.vehicleType}
                </li>
            </ul>
        </div>
    );
};

export default VehicleDetails;
