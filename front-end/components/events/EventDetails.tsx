import React from 'react';
import { EventInput } from '@types';

type Props = {
    event: EventInput;
};

const EventDetails: React.FC<Props> = ({event}: Props) => {

    if (!event) {
        return <p>Loading...</p>;
    };

    return (
        <>
            <section>
                <h1>{event.name}</h1>
                <p>{event.description}</p>
                <p>{new Date(event.date).toLocaleDateString()}</p>
                <p>{event.location}</p>
                <p>{event.category}</p>
            </section>
        </>
    )
};

export default EventDetails;