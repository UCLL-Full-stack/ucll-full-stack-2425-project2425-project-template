import { Event } from "../model/event";


const events = [
    new Event({
        id: 1,
        name: 'Taylor Swift concert',
        description: 'Amazing music, sang by a talented artist.',
        date: new Date('2024-12-12'), //!!!
        location: 'Amsterdam',
        category: 'Big-Event'
    }),
    new Event({
        id: 2,
        name: 'Crhis his Birthday party',
        description: 'It is Chris his birthday!',
        date: new Date('2025-6-15'),
        location: 'Brussel',
        category: 'Small-Event'
    }),
];

const getAllEvents = (): Event[] => {
    return events;
}

const getEventById = ({ id }: { id: number }): Event | null => {
    try {
        return events.find((event) => event.getId() === id) || null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for the details.')
    }
};

export default {
    getAllEvents,
    getEventById,
};