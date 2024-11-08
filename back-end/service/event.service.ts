import { Event } from "../model/event";
import eventDb from "../repository/event.db";
import userService from "./user.service";

//Function to get all the events
const getAllEvents = async (): Promise<Event[]> => {
    return eventDb.getAllEvents();
};

//To get the events by their id:
const getEventById = async (id: number): Promise<Event> => {
    const event = await eventDb.getEventById(id);
    if (!event) {
        throw new Error('Event not found');
    }
    return event;
};

const addParticipantToEvent = (email: string, eventId: number): void => {
    try {
        eventDb.addParticipantToEvent(email, eventId);
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
};

const getEventsByUserEmail = async (email: string): Promise<Event[]> => {
    try {
        return eventDb.getEventsByUserEmail(email);
    } catch(error){
        throw new Error('An unknown error occurred');
    }
};

export default { 
    // createEvent, 
    getAllEvents, 
    getEventById,
    addParticipantToEvent,
    // getEventsByParticipantEmail,
    getEventsByUserEmail
};