import { Event } from "../model/event";
import eventDb from "../repository/event.db";

//Function to get all the lecturers
const getAllEvents = (): Event[] => {
    return eventDb.getAllEvents();
};

//To get the events by their id:
const getEventById = (id: number): Event => {
    const event = eventDb.getEventById({ id });

    if (!event){
        throw new Error(`Event with id ${id} does not exist.`)
    }
    return event; // if found return the lecturer.
}

export default { getAllEvents, getEventById}