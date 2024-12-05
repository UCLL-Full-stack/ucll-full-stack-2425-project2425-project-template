import Header from "@/components/header";
import VehiclesOverviewTable from "@/components/vehicles/VehiclesOverviewTable";
import VehicleService from "@/services/VehicleService";
import { Vehicle } from "@/types";
import exp from "constants";
import Head from "next/head"
import { useEffect, useState } from "react";

const Vehicles: React.FC = () => {

    const [vehicles, setVehicles] = useState<Array<Vehicle>>([]);

    const refreshVehicles = async () => { 
        const response = await VehicleService.getAllVehicles();
        const updatedVehicles = await response.json();
        setVehicles(updatedVehicles);
    };

    useEffect(() => {
        refreshVehicles(); 
    }, []);

    return (
        <>
            <Head>
                <title>Vehicle</title>
                <meta name="description" content="Vehicle" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className="flex justify-center bg-white p-7 min-h-screen">
            
                <div className="items-center mb-6">
                    <section>
                    <VehiclesOverviewTable vehicles={vehicles} onVehiclesChange={refreshVehicles} />
                    </section>
                </div>

            </main>
        </>
    );
}
export default Vehicles;

