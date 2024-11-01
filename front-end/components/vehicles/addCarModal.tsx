
import { useState } from "react";
import { Vehicle } from "@/types";

type AddCarModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onAddCar: (newCar: Vehicle) => Promise<void>; // Assumes onAddCar is asynchronous
};

const AddCarModal: React.FC<AddCarModalProps> = ({ isOpen, onClose, onAddCar }) => {
    const [manufacturer, setManufacturer] = useState("");
    const [modelName, setModelName] = useState("");
    const [year, setYear] = useState("");
    const [price, setPrice] = useState("");
    const [fuelType, setFuelType] = useState("");
    const [transmissionType, setTransmissionType] = useState("");
    const [vehicleType, setVehicleType] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newCar: Vehicle = {
            id:0,
            manufacturer,
            model_name: modelName,
            year: parseInt(year),
            price: parseFloat(price),
            fuel_type: fuelType,
            transmission_type: transmissionType,
            vehicle_type: vehicleType,
        };

        await onAddCar(newCar); // Call the onAddCar function passed from the parent
        onClose(); // Close the modal after adding the car
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Add a New Car</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Manufacturer</label>
                        <input
                            type="text"
                            value={manufacturer}
                            onChange={(e) => setManufacturer(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Model Name</label>
                        <input
                            type="text"
                            value={modelName}
                            onChange={(e) => setModelName(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Year</label>
                        <input
                            type="number"
                            value={year}
                            onChange={(e) => setYear(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Price</label>
                        <input
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Fuel Type</label>
                        <input
                            type="text"
                            value={fuelType}
                            onChange={(e) => setFuelType(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Transmission Type</label>
                        <input
                            type="text"
                            value={transmissionType}
                            onChange={(e) => setTransmissionType(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium">Vehicle Type</label>
                        <input
                            type="text"
                            value={vehicleType}
                            onChange={(e) => setVehicleType(e.target.value)}
                            className="w-full px-4 py-2 border rounded-md"
                            required
                        />
                    </div>
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Add Car
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCarModal;