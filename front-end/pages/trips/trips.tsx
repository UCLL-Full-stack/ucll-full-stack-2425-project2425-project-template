import Navbar from "@/components/Navbar";
import TripOverviewTable from "@/components/TripOverviewTable";
import tripService from "@/services/tripService";
import { Trip } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from '../styles/Trips.module.css';

const Trips: React.FC = () => {
    const [trips, setTrips] = useState<Array<Trip>>([]);

    const getAllTrips = async () => {
        const response = await tripService.getAllTrips();
        const newTrips = await response.json();
        setTrips(newTrips);
    };

    useEffect(() => {
        getAllTrips();
    }, []);

    return (
        <>
            <Head>
                <title>Trips</title>
            </Head>
            <Navbar />
            <main className={styles['trips-page']}>
                <section className={styles['trips-overview-section']}>
                    <h2>Trips Overview</h2>
                    {trips && <TripOverviewTable trips={trips} />}
                </section>
            </main>
        </>
    );
};

export default Trips;
