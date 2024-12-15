import Navbar from "@/components/Navbar";
import TripOverviewTable from "@/components/TripOverviewTable";
import tripService from "@/services/tripService";
import { Trip } from "@/types";
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from '../styles/Trips.module.css';
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";

const Trips: React.FC = () => {
    const [trips, setTrips] = useState<Array<Trip>>([]);

    const { t } = useTranslation("common");

    const getAllTrips = async () => {
        const response = await tripService.getAllTrips();
        const newTrips = await response.json();
        if (Array.isArray(newTrips)) {
            setTrips(newTrips);
        } else {
            setTrips([]);
        }
    };

    useEffect(() => {
        getAllTrips();
    }, []);

    return (
        <>
            <Head>
                <title>{t("trips.titel")}</title>
            </Head>
            <Navbar />
            <main className={styles['trips-page']}>
                <section className={styles['trips-overview-section']}>
                    <h2>{t("trips.alle")}</h2>
                    {trips && <TripOverviewTable trips={trips} />}
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

export default Trips;