import { Event } from "../model/event";
import prisma from '../repository/database';
import database from './database';

const getAllEvents = async (): Promise<Event[]> => {
    const eventsPrisma = await database.event.findMany({
        include: {
            // users: true,
            tickets: true,
        },
    });
    return eventsPrisma.map((eventPrisma) => Event.from(eventPrisma));
}

const getEventById = async (id: number): Promise<Event> => {
    const eventPrisma = await database.event.findUnique({
        where: {
            id: id,
        },
        include: {
            tickets: true,
        },
    });

    if (!eventPrisma) {
        throw new Error('Event not found.');
    }
    return Event.from(eventPrisma);
};

const createEvent = async (eventData: Event): Promise<Event> => {
    const eventPrisma = await database.event.create({
        data: {
            name: eventData.name,
            description: eventData.description,
            date: eventData.date,
            location: eventData.location,
            category: eventData.category,
            isTrending: false
        }
    });

    return Event.from(eventPrisma);
};


export default {
    // createEvent,
    getAllEvents,
    getEventById,
    // addParticipantToEvent,
    // addParticipantToEvent,
    // getEventsByUserEmail,
    // userExist,
    // removeFromMyEvents
    createEvent,
};