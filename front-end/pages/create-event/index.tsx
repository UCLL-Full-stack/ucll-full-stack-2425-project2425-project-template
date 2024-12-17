import Header from "@components/header";
import Head from "next/head";
import styles from '@styles/home.module.css';
import { useState } from "react";
import { UserInput } from "types";

const CreateEvent: React.FC = () => {
    const [loggedInUser, setLoggedInUser] = useState<UserInput | null>(null);

    useEffect(() => {
        const localStorageUser = localStorage.getItem("loggedInUser");
        if (localStorageUser){
            setLoggedInUser(JSON.parse(localStorageUser));
        }
    }, []);

    return (
        <>
            <Head>
                <title>Create event</title>
                <meta name="description" content="Creating your own event" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className={styles.myEventsMain}>
                {loggedInUser && loggedInUser.role !== 'PARTICIPANT' ? (
                    <CreateEventForm />
                ) : (
                    <p className="mt-3 text-white">You are not authorised to see this page.</p>
                )}
            </main>
        </>
    )
};

import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import CreateEventForm from "@components/events/CreateEventForm";
import { useEffect } from "react";
export const getServerSideProps = async (context) => {
    const { locale } = context;

    return {
        props: {
            ...(await serverSideTranslations(locale ?? "en", ["common"])),
        },
    };
};

export default CreateEvent;