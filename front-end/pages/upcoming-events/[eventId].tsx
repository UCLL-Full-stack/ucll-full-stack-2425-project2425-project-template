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
    const [showForm, setShowForm] = useState(false);
    const [showAddButton, setShowAddButton] = useState(true);
    const [email, setEmail] = useState("");

    // Show error message
    const [showError, setShowError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    // const [eventId, setEventId] = useState<string>(null);

    const router = useRouter();
    const { eventId } = router.query;

    const [showParticipantList, setShowParticipantList] = useState(true);

    // If user is a participant, he can not see participant list
    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        const user = loggedInUser ? JSON.parse(loggedInUser) : null;

        // Only user exists people can see the participant list
        if ((user && user.role === 'PARTICIPANT') || !user) {
            setShowAddButton(false);
            setShowParticipantList(false);
        }
    }, []);

    useEffect(() => {
        if (eventId) {
            getEventById();
        }
    }, [eventId]);

    // Why when I do this, eventId turns null when refresh the page?
    // useEffect(() => {
    //     getEventById();
    // }, []);

    const getEventById = async () => {
        try {

            const response = await EventService.getEventById(eventId as string);
            const eventData = await response.json();
            setEvent(eventData);

        } catch (error) {
            console.error("Failed to fetch event:", error);
        }
    };

    const addParticipantToEvent = async () => {
        try {
            setShowError(false);
            setEmail("");
            setShowForm(false);
            setShowAddButton(true);
            const response = await EventService.addParticipantToEvent(email, eventId as string);
            setEvent(response);

        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("An unknown error occurred");
            }
            setShowError(true);
        }
    };

    const addSelfToEvent = async (selfEmail: string) => {
        try {
            setShowError(false);
            setEmail("");
            setShowForm(false);
            setShowAddButton(true);
            const response = await EventService.addParticipantToEvent(selfEmail, eventId as string);
            setEvent(response);

        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message);
            } else {
                setErrorMessage("An unknown error occurred");
            }
            setShowError(true);
        }
    };

    const handleAddParticipant = async () => {
        setShowError(false);
        setShowForm(true);
        setShowAddButton(false);
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        addParticipantToEvent();
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
            <main className={styles.eventDetailsMain}>
                <h1>Event Details</h1>
                {event ? (
                    <section className={styles.eventDetails}>
                        <EventDetails event={event} showParticipantList={showParticipantList} addSelfToEvent={addSelfToEvent} />
                    </section>
                ) : (
                    <p>Loading event details...</p>
                )}

                {showError && (
                    <p className={styles.errorMessage}>{errorMessage}</p>
                )}

                {showAddButton && (
                    <button
                        onClick={handleAddParticipant}
                        className={styles.addParticipantButton}
                    >
                        Add participant
                    </button>
                )}

                {showForm && (
                    <form
                        onSubmit={handleFormSubmit}
                        className={styles.addParticipantForm}>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <button type="submit">Submit</button>
                    </form>
                )}
            </main>
        </>
    )
};

export default RenderEventDetailsById;