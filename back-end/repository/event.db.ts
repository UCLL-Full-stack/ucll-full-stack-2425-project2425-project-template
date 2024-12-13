import { Event } from "../model/event";
import prisma from '../repository/database';
import database from './database';

const getAllEvents = async (): Promise<Event[]> => {
    const eventsPrisma = await database.event.findMany({
        include: {
            users: true,
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
            users: true,
            tickets: true,
        },
    });

    if (!eventPrisma) {
        throw new Error('Event not found.');
    }
    return Event.from(eventPrisma);
};

const addParticipantToEvent = async (email: string, eventId: number): Promise<Event> => {

    const userExisted = await userExist(email, eventId);
    if (userExisted) {
        throw new Error(`User [${email}] already exists in this event.`);
    };

    const user = await database.user.findUnique({
        where: {
            email: email,
        },
    });

    if (!user) {
        throw new Error(`User [${email}] not found.`);
    }

    const update = await database.event.update({
        where: {
            id: eventId,
        },
        data: {
            users: {
                connect: {
                    id: user.id,
                },
            },
        },
        include: {
            users: true,
            tickets: true,
        },
    });

    return Event.from(update);
};

const userExist = async (email: string, eventId: number): Promise<boolean> => {
    const event = await getEventById(eventId);

    for (const user of event.getUsers()) {
        if (user.getEmail() === email) {
            return true;
        }
    }

    return false;
};

const getEventsByUserEmail = async (email: string): Promise<Event[]> => {
    const events = await database.event.findMany({
        where: {
            users: {
                some: {
                    email: email,
                },
            },
        },
        include: {
            users: true,
            tickets : true,
        },
    });
    return events.map((event) => Event.from(event));
};


// remove events
const removeFromMyEvents = async (email: string, eventId: number) => {
    await database.event.update({
        where: {
            id: eventId, //event op basis van id
        },
        data: {
            users: {
                disconnect: {
                    email: email,
                },
            },
        },
    });

    // return { success: true, message: `Event ${eventId} successfully deleted ${email}.` };
};


export default {
    // createEvent,
    getAllEvents,
    getEventById,
    // addParticipantToEvent,
    addParticipantToEvent,
    getEventsByUserEmail,
    userExist,
    removeFromMyEvents
};