

import Header from "@/components/header";
import AddCarModal from "@/components/vehicles/addCarModal";
import editCarModal from "@/components/vehicles/editCarModal";
import VehiclesOverviewTable from "@/components/vehicles/VehiclesOverviewTable"; // Or `VehiclesOverviewCards`, if you prefer the card view

import VehicleService from "@/services/VehicleService";
import { Vehicle } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";

const Users: React.FC = () => {
    const [userVehicles, setUserVehicles] = useState<Array<Vehicle>>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, SetIsEditModalOpen] = useState(false);

    // Fetch the user's vehicles
    const getUserVehicles = async () => { 
        const response = await VehicleService.getAllVehicles(); // Assuming a `getUserVehicles` method
        const vehicles = await response.json();
        setUserVehicles(vehicles);
    };

    // Function to handle adding a new car
    const handleAddCar = async (newCar: Vehicle) => {
        try {
            const response = await VehicleService.addVehicle(newCar);
            if (response.ok) {
                const addedCar = await response.json();
                setUserVehicles((prevVehicles) => [...prevVehicles, addedCar]); // Update state with new car
            }
        } catch (error) {
            console.error("Failed to add car:", error);
        }
    };

    useEffect(() => {
        getUserVehicles(); // Fetch vehicles when component mounts
    }, []);

    const handleAddCarClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };


    return (
        <>
            <Head>
                <title>My Cars</title>
                <meta name="description" content="User Vehicles" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className="mr-10 ml-10">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">My Cars</h1>
                    <button 
                        onClick={handleAddCarClick} 
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                        ADD VEHICLE
                    </button>
                </div>

                <section>
                    {userVehicles && <VehiclesOverviewTable vehicles={userVehicles} />}
                </section>

                {/* Render the AddCarModal */}
                <AddCarModal 
                    isOpen={isModalOpen} 
                    onClose={handleCloseModal} 
                    onAddCar={handleAddCar} 
                />

            </main>
        </>
    );
};

export default Users;