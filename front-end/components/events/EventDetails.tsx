import React from 'react';
import { EventInput } from '@types';
import styles from '@styles/home.module.css';
import { useState, useEffect } from 'react';

type Props = {
    event: EventInput;
    showParticipantList: boolean;
    addSelfToEvent: (email: string) => void;
};

const EventDetails: React.FC<Props> = ({ event, showParticipantList, addSelfToEvent}: Props) => {
    const [statusMessage, setStatusMessage] = useState<string>("");
    const [showTickets, setShowTickets] = useState<boolean>(false);
    const [loggedInUser, setLoggedInUser] = useState<UserInput[]>();

    useEffect(() => {
        const loggedInUser = localStorage.getItem('loggedInUser');
        const user = loggedInUser ? JSON.parse(loggedInUser) : null;

        if (user) {
            setLoggedInUser(user);
            setShowTickets(true);
        } else {
            setStatusMessage("You need to log in to see the tickets for this event.");
        }
    }, []);

    if (!event) {
        return <p>Loading...</p>;
    };

    return (
        <>
            <div>
                <h2>{event.name}</h2>
                <p><img src="/icons/description.png" alt="Description icon" width="20px" height="20px" /> {event.description}</p>
                <p><img src="/icons/calendar.png" alt="Calendar icon" width="20px" height="20px" /> {new Date(event.date).toLocaleDateString()}</p>
                <p><img src="/icons/location.png" alt="Location icon" width="20px" height="20px" /> {event.location}</p>
                <p><img src="/icons/category.png" alt="Category icon" width="20px" height="20px" /> {event.category}</p>

                {showTickets ? (
                    <div className={styles.eventDetailTickets}>
                        {event.tickets.map((ticket, index) => (
                            <div key={index}>
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-grey-500 rounded"
                                    onClick={() => addSelfToEvent(loggedInUser.email)}
                                >{ticket.type} €{ticket.cost}</button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p
                        className="px-4 py-2 bg-black rounded mb-1 mt-3 text-white text-center"
                    >{statusMessage}</p>
                )}

                {showParticipantList && (
                    event.users && event.users.length > 0 && (
                        <div className={styles.participants}>
                            <h2>Participants</h2>
                            <table className={styles.participantsTable}>
                                <thead>
                                    <tr>
                                        <th>Username</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {event.users.map((user, index) => (
                                        <tr key={index}>
                                            <td>{user.username}</td>
                                            <td>{user.name}</td>
                                            <td>{user.email}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))
                }
            </div>
        </>
    )
};

export default EventDetails;