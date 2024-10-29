import { add } from 'date-fns';
import { Event } from '../model/event';

const event1 = new Event({
    name: 'Event 1',
    date: add(new Date(), { days: 1 }), // Correct usage of the add function
    price: 20,
    minParticipants: 5,
    maxParticipants: 10
});
const events: Event[] = [event1];


const addEvent = (event: Event) => {
    events.push(event);
    return event;
}

const getEventById = (id: number) => {
    return events.find(event => event.getId() === id);
}


const getEvents = () => {
    return events;
}



export default {
    addEvent,
    getEventById,
    getEvents,
}