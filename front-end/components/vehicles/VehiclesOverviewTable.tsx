import { Vehicle } from "@/types";

type Props = {
    vehicles: Array<Vehicle>;
}

const VehiclesOverviewCards: React.FC<Props> = ({ vehicles }: Props) => {
    return (
        <div className="flex flex-wrap gap-4">
            {vehicles && vehicles.map((vehicle, index) => (
                <div key={index} className="w-64 border border-gray-300 rounded-lg shadow-lg p-4 bg-white cursor-pointer">
                    {/* Image Placeholder */}
                    <div className="flex items-center justify-center h-32 bg-gray-200 rounded-lg mb-4">
                        <svg className="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M5 8c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2v8c0 1.1-.9 2-2 2H7c-1.1 0-2-.9-2-2V8zm8 3l2.5 3.5h-5L10 13l-1 1-1.5-2L7 15h10l-4-6z"/>
                        </svg>
                    </div>

                    {/* Vehicle Details */}
                    <h2 className="text-lg font-semibold text-center">{vehicle.manufacturer} {vehicle.model_name}</h2>
                    <p className="text-xl font-bold text-center mt-2">€{vehicle.price}</p>
                    <div className="text-gray-500 mt-1 text-center">
                        <p>Year: {vehicle.year}</p>
                        <p>Fuel: {vehicle.fuel_type}</p>
                        <p>Transmission: {vehicle.transmission_type}</p>
                        <p>Type: {vehicle.vehicle_type}</p>
                    </div>

                    {/* Edit Button */}
                    <div className="mt-4 flex justify-center">
                        <button className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-gray-300">EDIT</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default VehiclesOverviewCards;