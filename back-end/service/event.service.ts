import { Event } from "../model/event";
import eventDb from "../repository/event.db";
import ticketDb from "../repository/ticket.db";
import userService from "./user.service";


//Function to get all the events
const getAllEvents = async (): Promise<Event[]> => {
    return await eventDb.getAllEvents();
};

//To get the events by their id:
const getEventById = async (id: number): Promise<Event> => {

    if (!id || typeof id !== 'number' || id <= 0) {
        throw new Error('Invalid ID provided. ID must be a positive number.');
    };

    const event = await eventDb.getEventById(id);
    if (!event) {
        throw new Error('Event not found.');
    }
    return event;
};

// const addParticipantToEvent = async (email: string, eventId: number): Promise<Event> => {
//     return await eventDb.addParticipantToEvent(email, eventId);
// };

const getEventsByUserEmail = async (email: string): Promise<Event[]> => {
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        throw new Error('Invalid email format.');
    }

    const tickets = await ticketDb.getTicketsByUserEmail(email);
    const events = tickets.map((ticket) => ticket.event);

    return events;
};

const createEvent = async (eventData: Event): Promise<Event> => {
    if (!eventData.name || eventData.name.trim().length === 0 || !eventData.description || !eventData.date || !eventData.location) {
        throw new Error('Missing required fields.');
    }

    if (new Date(eventData.getDate()) < new Date()) {
        throw new Error('Event date cannot be in the past.');
    }

    return await eventDb.createEvent(eventData);
}


export default {
    // createEvent,
    getAllEvents,
    getEventById,
    // addParticipantToEvent,
    // getEventsByParticipantEmail,
    getEventsByUserEmail,
    // removeEvent,
    createEvent,
};