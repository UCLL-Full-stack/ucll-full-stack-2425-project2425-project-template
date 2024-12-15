import bookingService from "@/services/BookingService";
import { Booking } from "@/types";
import { useEffect, useState } from "react";
import Navbar from '@/components/Navbar';
import Head from "next/head";
import styles from '../styles/Bookings.module.css';
import BookingOverviewTable from "@/components/BookingOverviewTable";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";

const Bookings: React.FC = () => {
    const [bookings, setBookings] = useState<Array<Booking>>([]);

    const { t } = useTranslation("common");

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
                <title>{t("booking.booking")}</title>
            </Head>
            <Navbar />
            <main className={styles['bookings-page']}>
                <section className={styles['bookings-overview-section']}>
                    <h2>{t("booking.mijn")}</h2>
                    {bookings && <BookingOverviewTable bookings={bookings} />}
                </section>
            </main>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
    const  { locale} = context;
    return {
        props: {
            ...(await serverSideTranslations(locale ?? "nl", ["common"]))
        },
    };
};

export default Bookings;