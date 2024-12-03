import { Event } from '../model/event';
import database from './database';

const addEvent = async (event: Event): Promise<Event> => {
    try {
        const result = await database.event.create({
            data: {
                name: event.getName(),
                date: event.getDate(),
                price: event.getPrice(),
                minParticipants: event.getMinParticipants(),
                maxParticipants: event.getMinParticipants(),
                location: {
                    connect: {
                        id: event.getLocation().getId(),
                    },
                },
                category: {
                    connect: {
                        id: event.getCategory().getId(),
                    },
                },
                dateCreated: event.getDateCreated(),
                lastEdit: event.getLastEdit(),
            },
            include: {
                location: true,
                category: true,
            },
        });
        return Event.from(result);
    } catch (error) {
        throw new Error(`Error:${error}`);
    }
};

const getEventById = async (id: number): Promise<Event> => {
    try {
        const result = await database.event.findUnique({
            where: { id: id },
            include: { location: true, category: true },
        });
        if (!result) {
            throw new Error(`No event with id ${id} found`);
        }
        return Event.from(result);
    } catch (error) {
        console.log(error);
        throw new Error('Database error, see server logs for more detail');
    }
};

const getEvents = async (): Promise<Event[]> => {
    try {
        const eventPrisma = await database.event.findMany({
            include: { location: true, category: true },
        });
        return eventPrisma.map((event) => Event.from(event));
    } catch (error) {
        console.log(error);
        throw new Error('Database Error, see server log for more detail');
    }
};

export default {
    addEvent,
    getEventById,
    getEvents,
};
