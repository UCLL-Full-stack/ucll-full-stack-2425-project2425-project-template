import { Event } from "../model/event";

//Create event:
const createEvent = (event: Event): Event =>{
    events.push(event);
    return event;
}



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
        name: 'Chris his Birthday party',
        description: 'It is Chris his birthday!',
        date: new Date('2025-6-15'),
        location: 'Brussel',
        category: 'Small-Event'
    }),
    new Event({
        id: 3,
        name: 'Food Festival',
        description: 'A festival with a variety of delicious foods from all around the world.',
        date: new Date('2024-11-20'),
        location: 'Paris',
        category: 'Big-Event'
    }),
    new Event({
        id: 4,
        name: 'Company Networking Night',
        description: 'An evening to connect and network with industry professionals.',
        date: new Date('2024-12-05'),
        location: 'Berlin',
        category: 'Medium-Event'
    }),
    new Event({
        id: 5,
        name: 'Art Exhibition: Modern Wonders',
        description: 'A showcase of contemporary art from emerging artists.',
        date: new Date('2025-02-18'),
        location: 'London',
        category: 'Big-Event'
    }),
    new Event({
        id: 6,
        name: 'Yoga Workshop',
        description: 'A relaxing yoga session for all skill levels, focusing on mindfulness and flexibility.',
        date: new Date('2025-03-10'),
        location: 'Barcelona',
        category: 'Small-Event'
    }),
    new Event({
        id: 7,
        name: 'Startup Pitch Competition',
        description: 'Innovative startups compete to win funding and recognition.',
        date: new Date('2025-04-22'),
        location: 'Dublin',
        category: 'Medium-Event'
    }),

    new Event({
        id: 8,
        name: 'Tech Conference 2025',
        description: 'A conference featuring the latest advancements in technology and innovation.',
        date: new Date('2025-05-10'),
        location: 'San Francisco',
        category: 'Big-Event'
    }),
    new Event({
        id: 9,
        name: 'Wine Tasting Evening',
        description: 'An elegant evening of fine wines and gourmet pairings.',
        date: new Date('2025-07-08'),
        location: 'Rome',
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
    createEvent,
    getAllEvents,
    getEventById,
};