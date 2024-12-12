import eventDb from '../repository/event.db';
import { Event } from '../model/event';
import { EventInput, Role } from '../types';
import locationService from './location.service';
import categoryService from './category.service';
import { Category } from '../model/category';
import { Location } from '../model/location';

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

const editEvent = async (id: number, editEvent: EventInput, role: Role) => {
    try {
        if (role === 'Admin' || role === 'Mod') {
            const location = await locationService.addLocation(editEvent.location);
            const category = await categoryService.addCategory(editEvent.category);
            editEvent.category = {
                id: category.getId(),
                name: category.getName(),
                description: category.getDescription(),
            };
            editEvent.location = {
                id: location.getId(),
                street: location.getStreet(),
                number: location.getNumber(),
                city: location.getCity(),
                country: location.getCountry(),
            };
            return eventDb.editEvent(id, editEvent);
        } else {
            throw new Error(`Only an administrator or event moderator can edit events.`);
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
    editEvent,
    getEventById,
    getEvents,
};
