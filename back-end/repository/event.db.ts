import { add } from 'date-fns';
import { Event } from '../model/event';
import { Location } from '../model/location';
import { Category } from '../model/category';

const events: Event[] = [
    new Event({
        name: 'Fred Again.. concert',
        date: new Date('2025-09-16'),
        price: 20.5,
        minParticipants: 0,
        maxParticipants: 5000,
        location: new Location({
            street: 'AV. de Miramar',
            number: 1,
            city: 'Brussels',
            country: 'Belgium',
        }),
        category: new Category({
            name: 'Concert',
            description: 'Concert of a certain artist',
        }),
    }),
];

const addEvent = (event: Event) => {
    events.push(event);
    return event;
};

const getEventById = (id: number) => {
    return events.find((event) => event.getId() === id);
};

const getEvents = () => {
    return events;
};

export default {
    addEvent,
    getEventById,
    getEvents,
};
