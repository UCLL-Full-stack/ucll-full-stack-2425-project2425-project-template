import { add } from 'date-fns';
import { Event } from '../model/event';

const events: Event[] = [];


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