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

    useEffect(() => {
            getEventById();
    }, [event]);

    const handleAddParticipant = () => {
        setShowError(false);
        setShowForm(true);
        setShowAddButton(false);
    };

    const handleFormSubmit = (e: React.FormEvent) => {
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
                        <EventDetails event={event} />
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