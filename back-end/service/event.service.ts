import eventDb from "../repository/event.db";  
import { Event } from "../model/event";


const addEvent = (event: Event) => {
    return eventDb.addEvent(event);
}

const getEventById = (id: number) => {
    const event = eventDb.getEventById(id);
    if (!event) throw new Error('Event not found.');
    return eventDb.getEventById(id);
}

const getEvents = () => {
    return eventDb.getEvents();
}

export default {
    addEvent,
    getEventById,
    getEvents,
}