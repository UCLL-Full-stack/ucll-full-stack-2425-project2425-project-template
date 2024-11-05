import EventOverview from "@components/events/EventOverview";
import Header from "@components/header";
import EventService from "@services/EventService";
import Head from "next/head";
import { useEffect, useState } from "react";
import { EventInput } from "types";
import styles from '@styles/home.module.css';

const MyEvents: React.FC = () => {
    const [myEvents, setMyEvents] = useState<Array<Event>>();
    const [email, setEmail] = useState("");
    const [showForm, setShowForm] = useState(true);

    // useEffect(() => {
    //     getEventsByParticipantEmail();
    // }, [myEvents]);

    const getEventsByParticipantEmail = async () => {
        const events = await EventService.getEventsByParticipantEmail(email);
        // const events = await response.json();

        const sortedEvents = events.sort((a: EventInput, b: EventInput) => new Date(a.date).getTime() - new Date(b.date).getTime());
        setMyEvents(sortedEvents);
    }

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setShowForm(false);
        getEventsByParticipantEmail();
    };

    return (
        <>
            <Head>
                <title>My events</title>
                <meta name="description" content="Overview of my upcoming events" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            {showForm && (
                <form 
                    onSubmit={handleFormSubmit} 
                    className={styles.loginToMyEvent}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    <button type="submit">Submit</button>
                </form>
            )}
            { myEvents && (
                myEvents.length > 0 ? (
                    <section className={styles.myEvents}>
                        <h1>My events</h1>
                        <EventOverview events={myEvents} />
                    </section>
                ) : <p>No events</p>
            )}
        </>
    )
};

export default MyEvents;