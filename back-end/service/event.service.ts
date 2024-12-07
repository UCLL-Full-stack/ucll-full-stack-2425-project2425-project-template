import eventDb from '../repository/event.db';
import { Event } from '../model/event';
import { EventInput, Role } from '../types';
import locationService from './location.service';
import categoryService from './category.service';

const addEvent = async ({
    name,
    date,
    price,
    minParticipants,
    maxParticipants,
    location: LocationInput,
    category: CategoryInput,
}: EventInput): Promise<Event> => {
    try {
        const location = await locationService.addLocation(LocationInput);
        const category = await categoryService.addCategory(CategoryInput);

        const event = new Event({
            name,
            date,
            price,
            minParticipants,
            maxParticipants,
            location,
            category,
        });

        return await eventDb.addEvent(event);
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
};

const deleteEvent = async (id: number, role: Role) => {
    try {
        if (role == 'Admin') {
            await eventDb.deleteEventById(id);
            return;
        } else {
            throw new Error(`Only an administrator can delete events.`);
        }
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
};

const getEventById = async (id: number): Promise<Event> => {
    try {
        const result = await eventDb.getEventById(id);
        if (!result) {
            throw new Error(`No event with id ${id} found.`);
        }
        return result;
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
};

const getEvents = (): Promise<Event[]> => eventDb.getEvents();

export default {
    addEvent,
    deleteEvent,
    getEventById,
    getEvents,
};
