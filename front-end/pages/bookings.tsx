import bookingService from "@/services/bookingService";
import { Booking } from "@/types";
import { useEffect, useState } from "react";
import Navbar from '@/components/Navbar';
import Head from "next/head";
import styles from '../styles/Bookings.module.css';
import BookingOverviewTable from "@/components/BookingOverviewTable";

const Bookings: React.FC = () => {
    const [bookings, setBookings] = useState<Array<Booking>>([]);

    const getAllBookings = async () => {
        const response = await bookingService.getAllBookings();
        const newBookings = await response.json();
        setBookings(newBookings);
    };

    useEffect(() => {
        getAllBookings();
    }, []);

    return (
        <>
            <Head>
                <title>Bookings</title>
            </Head>
            <Navbar />
            <main className={styles['bookings-page']}>
                <section className={styles['bookings-overview-section']}>
                    <h2>Bookings Overview</h2>
                    {bookings && <BookingOverviewTable bookings={bookings} />}
                </section>
            </main>
        </>
    );
};

export default Bookings;