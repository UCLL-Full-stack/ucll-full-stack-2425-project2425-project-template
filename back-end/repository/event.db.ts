import { Event } from "../model/event";
import { User } from "../model/user";
import database from './database';

const getAllEvents = async (): Promise<Event[]> => {
    try {
        const eventsPrisma = await database.event.findMany({
            include: {
                users: true,
            },
        });
        return eventsPrisma.map((eventPrisma) => Event.from(eventPrisma));
    }
    catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
}

const getEventById = async (id: number): Promise<Event> => {
    try {
        const eventPrisma = await database.event.findUnique({
            where: {
                id: id,
            },
            include: {
                users: true,
            },
        });

        if (!eventPrisma) {
            throw new Error('Event not found.');
        }
        return Event.from(eventPrisma);
        
    } catch (error) {
        throw new Error('Database error. See server log for the details.')
    }
};

const addParticipantToEvent = async (email: string, eventId: number) => {
    try {
        const user = await database.user.findUnique({
            where: {
                email: email,
            },
        });

        if (!user) {
            throw new Error('User not found.');
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
        });
    } catch (error) {
        throw new Error('Database error. See server log for the details.');
    }
};

// const addParticipantToEvent = (participant: Participant, eventId: number): void => {
//     events.forEach(event => {
//         if (event.getId() === eventId) {
//             event.getParticipants().forEach(p => {
//                 if (p.getUser().getId() === participant.getUser().getId()) {
//                     throw new Error('Participant already exists in the event.');
//                 }
//             });
//             event.addParticipant(participant);
//         };
//     });
// };

const getEventsByUserEmail = async (email: string): Promise<Event[]> => {
    try {
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
            },
        });
        return events.map((event) => Event.from(event));

    } catch (error) {
        throw new Error('Database error. See server log for the details.');
    }
};

export default {
    // createEvent,
    getAllEvents,
    getEventById,
    // addParticipantToEvent,
    addParticipantToEvent,
    getEventsByUserEmail,
};