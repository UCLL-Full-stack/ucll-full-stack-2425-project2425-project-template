import { add } from 'date-fns';
import { Event } from '../model/event';
import { Location } from '../model/location';
import { Category } from '../model/category';

const event1 = new Event({
    name: 'Fred Again..',
    date: add(new Date(), { days: 1 }),
    price: 20,
    minParticipants: 5,
    maxParticipants: 10,
    location: new Location({
        street: 'ING Arena',
        number: 1,
        city: 'Brussels',
        country: 'Belgium',
    }),
    category: new Category({ name: 'Concert', description: 'Concert of artist' }),
});
const events: Event[] = [event1];

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
