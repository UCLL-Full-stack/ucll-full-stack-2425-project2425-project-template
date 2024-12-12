import React from 'react';
import { EventInput } from '@types';
import styles from '@styles/home.module.css';

type Props = {
    event: EventInput;
    showParticipantList: boolean;
};

const EventDetails: React.FC<Props> = ({ event, showParticipantList }: Props) => {

    if (!event) {
        return <p>Loading...</p>;
    };

    return (
        <>
            <h2>{event.name}</h2>
            <p><img src="/icons/description.png" alt="Description icon" width="20px" height="20px" /> {event.description}</p>
            <p><img src="/icons/calendar.png" alt="Calendar icon" width="20px" height="20px" /> {new Date(event.date).toLocaleDateString()}</p>
            <p><img src="/icons/location.png" alt="Location icon" width="20px" height="20px" /> {event.location}</p>
            <p><img src="/icons/category.png" alt="Category icon" width="20px" height="20px" /> {event.category}</p>
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
        </>
    )
};

export default EventDetails;