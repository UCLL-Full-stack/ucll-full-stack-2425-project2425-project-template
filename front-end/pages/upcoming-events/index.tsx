import Header from "@components/header";
import EventService from "@services/EventService";
import EventOverview from '@components/events/EventOverview'
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from '@styles/home.module.css';

const UpcomingEvents: React.FC = () => {
    type Event = {
        date: string;
        // Add other properties of Event here
    };
    
    const [events, setEvents] = useState<Array<Event>>();

    useEffect(() => {
        getAll();
    }, []);

    const getAll = async () => {
        const response = await EventService.getAll();
        const events = await response.json();

        // Sort events by date
        const sortedEvents = events.sort((a: Event, b: Event) => new Date(a.date).getTime() - new Date(b.date).getTime());

        setEvents(sortedEvents);
    };

    return (
        <>
            <Head>
                <title>Upcoming events</title>
                <meta name="description" content="Overview of upcoming events" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <main className={styles.upcomingEventsMain}>
                <h1>Top Trending Events</h1>
                {events && <EventOverview events={events} />}
            </main>
        </>
    );
};

export default UpcomingEvents;