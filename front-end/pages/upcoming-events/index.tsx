import Header from "@components/header";
import EventService from "@services/EventService";
import EventOverview from '@components/events/EventOverview'
import Head from "next/head";
import { useEffect, useState } from "react";

const UpcomingEvents: React.FC = () => {
    const [events, setEvents] = useState<Array<Event>>();

    useEffect(() => {
        getAll();
    }, []);

    const getAll = async () => {
        const response = await EventService.getAll();
        const events = await response.json();
        setEvents(events);
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
            <main>
                {events && <EventOverview events={events} />}
            </main>
        </>
    );
};

export default UpcomingEvents;