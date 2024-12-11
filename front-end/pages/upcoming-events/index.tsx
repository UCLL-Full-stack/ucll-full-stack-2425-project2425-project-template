import Header from "@components/header";
import EventService from "@services/EventService";
import EventOverview from '@components/events/EventOverview'
import Head from "next/head";
import { useEffect, useState } from "react";
import styles from '@styles/home.module.css';
import { EventInput } from "types";

const UpcomingEvents: React.FC = () => {
    const [otherEvents, setOtherEvents] = useState<Array<Event>>();
    const [trendingEvents, setTrendingEvents] = useState<Array<Event>>();

    useEffect(() => {
        getAll();
    }, []);

    const getAll = async () => {
        const response = await EventService.getAll();
        const events = await response.json();

        // Sort events by date
        const sortedEvents = events.sort((a: EventInput, b: EventInput) => new Date(a.date).getTime() - new Date(b.date).getTime());

        const tempOtherEvents = sortedEvents.filter((e: EventInput) => !e.isTrending);
        const tempTrendingEvents = sortedEvents.filter((e: EventInput) => e.isTrending);

        setOtherEvents(tempOtherEvents);
        setTrendingEvents(tempTrendingEvents);
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
                {trendingEvents && <EventOverview events={trendingEvents} showDeleteButton={false} email="" />}
                
                <h1>Other events that you might like</h1>
                {otherEvents && <EventOverview events={otherEvents} showDeleteButton={false} email="" />}
            </main>
        </>
    );
};

export default UpcomingEvents;