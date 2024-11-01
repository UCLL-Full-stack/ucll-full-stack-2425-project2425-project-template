import EventDetails from "@components/events/EventDetails";
import Header from "@components/header";
import EventService from "@services/EventService";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { EventInput } from "types";
import styles from '@styles/home.module.css';

const RenderEventDetailsById: React.FC = () => {

    const [event, setEvent] = useState<EventInput>();

    const router = useRouter();
    const { eventId } = router.query;

    const getEventById = async () => {
        try {
            const response = await EventService.getEventById(eventId as string);
            const event = await response.json();
            setEvent(event);
        } catch (error) {
            console.error("Failed to fetch event:", error);
        }
    };

    useEffect(() => {
        if (eventId && !event) {
            getEventById();
        }
    }, [eventId, event]);

    return (
        <>
            <Head>
                <title>Upcoming events</title>
                <meta name="description" content="Overview of upcoming events" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className={styles.eventDetailsMain}>
                <h1>Event Details</h1>
                {event ? (
                    <section className={styles.eventDetails}>
                        <EventDetails event={event} />
                    </section>
                ) : (
                    <p>Loading event details...</p>
                )}
            </main>
        </>
    )
};

export default RenderEventDetailsById;