

import Header from "@/components/header";
import AddCarModal from "@/components/vehicles/addCarModal";
import VehiclesOverviewTable from "@/components/vehicles/VehiclesOverviewTable";
import VehicleService from "@/services/VehicleService";
import { Vehicle } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";

const Users: React.FC = () => {
    const [userVehicles, setUserVehicles] = useState<Array<Vehicle>>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
  
    

    const getUserVehicles = async () => { 
        const response = await VehicleService.getAllVehicles(); 
        const vehicles = await response.json();
        setUserVehicles(vehicles);
    };

    const handleAddCar = async (newCar: Vehicle) => {
        try {
            const response = await VehicleService.addVehicle(newCar);
            if (response.ok) {
                const addedCar = await response.json();
                setUserVehicles((prevVehicles) => [...prevVehicles, addedCar]);
                getUserVehicles() 
            }
        } catch (error) {
            console.error("Failed to add car:", error);
        }


    };

    useEffect(() => {
        getUserVehicles(); 
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
            <main className="bg-[#F5F5F5 min-h-100]">
                <div className="mr-10 ml-10 mt-10">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-2xl font-bold">My Cars</h1>
                        <button 
                            onClick={handleAddCarClick} 
                            className="flex items-center px-4 py-2 text-lg font-medium text-black bg-[#FCBA04] hover:bg-[#FDCD49] drop-shadow-lg align-middle rounded-lg transition duration-500"
                        >
                            ADD VEHICLE
                        </button>
                    </div>

                    <section>
                        {userVehicles && (<VehiclesOverviewTable vehicles={userVehicles} onVehiclesChange={getUserVehicles} />)}
                    </section>
                </div>

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