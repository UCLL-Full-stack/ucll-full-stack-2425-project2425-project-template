import Header from "@/components/header";
import VehiclesOverviewTable from "@/components/vehicles/VehiclesOverviewTable";
import VehicleService from "@/services/VehicleService";
import { Vehicle } from "@/types";
import exp from "constants";
import Head from "next/head"
import { useEffect, useState } from "react";

const Vehicles: React.FC = () => {

    const [vehicles, setVehicles] = useState<Array<Vehicle>>([]);

    const getVehicles = async() =>{ 
        const response = await VehicleService.getAllVehicles();
        const vehicle = await response.json();
        setVehicles(vehicle);
    }


    useEffect(()=>{
        getVehicles();
    },[])

    return (
        <>
            <Head>
                <title>Vehicle</title>
                <meta name="description" content="Vehicle" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main>
                <div>
                    <h2>Vehicles</h2>
                    <section>
                        {vehicles && <VehiclesOverviewTable vehicles={vehicles} />}

                    </section>
                </div>

            </main>
        </>
    );
}
export default Vehicles;