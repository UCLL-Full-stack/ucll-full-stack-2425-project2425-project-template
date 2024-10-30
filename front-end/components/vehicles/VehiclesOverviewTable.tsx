import { Vehicle } from "@/types";
import { table } from "console";
import exp from "constants";

type Props = {
    vehicles: Array<Vehicle>;
}

const VehiclesOverviewTable:React.FC<Props> = ({vehicles}: Props) => {
    return(
        <>
            {vehicles &&(
                <table  className="table table-hove">
                    <thead>
                        <tr>
                            <th>Manufacturer</th>
                            <th>Model Name</th>
                            <th>Year</th>
                            <th>Price</th>
                            <th>Fuel Type</th>
                            <th>Transmission Type</th>
                            <th>Vehicle Type</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vehicles.map((vehicle, index) => (
                            <tr key={index}>
                                <td>{vehicle.manufacturer}</td>
                                <td>{vehicle.model_name}</td>
                                <td>{vehicle.year}</td>
                                <td>{vehicle.price}</td>
                                <td>{vehicle.fuel_type}</td>
                                <td>{vehicle.transmission_type}</td>
                                <td>{vehicle.vehicle_type}</td>
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </>
    )
}
export default VehiclesOverviewTable;