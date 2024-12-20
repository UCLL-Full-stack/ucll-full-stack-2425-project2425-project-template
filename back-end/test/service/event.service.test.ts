import eventService from '../../service/event.service';
import eventDb from '../../repository/event.db';
import ticketDb from '../../repository/ticket.db';
import { Event } from '../../model/event';

jest.mock('../../repository/event.db');
jest.mock('../../repository/ticket.db');

const mockEventDbGetAllEvents = eventDb.getAllEvents as jest.Mock;
const mockEventDbGetEventById = eventDb.getEventById as jest.Mock;
const mockEventDbCreateEvent = eventDb.createEvent as jest.Mock;
const mockTicketDbGetTicketsByUserEmail = ticketDb.getTicketsByUserEmail as jest.Mock;

const validEventData = {
    id: 1,
    name: 'Sample Event',
    description: 'This is a sample event description.',
    date: new Date('2025-12-17'),
    location: 'New York',
    category: 'Technology',
    backgroundImage: '/images/sample-event.jpg',
    isTrending: true,
};

describe('Event Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllEvents', () => {
        it('should return all events', async () => {
            mockEventDbGetAllEvents.mockResolvedValue([validEventData]);

            const events = await eventService.getAllEvents();

            expect(mockEventDbGetAllEvents).toHaveBeenCalledTimes(1);
            expect(events).toEqual([validEventData]);
        });
    });

    describe('getEventById', () => {
        it('should return an event by ID', async () => {
            mockEventDbGetEventById.mockResolvedValue(validEventData);

            const event = await eventService.getEventById(1);

            expect(mockEventDbGetEventById).toHaveBeenCalledTimes(1);
            expect(event).toEqual(validEventData);
        });

        it('should throw an error if the ID is invalid', async () => {
            await expect(eventService.getEventById(-1)).rejects.toThrow('Invalid ID provided. ID must be a positive number.');
            await expect(eventService.getEventById(0)).rejects.toThrow('Invalid ID provided. ID must be a positive number.');
            await expect(eventService.getEventById(NaN)).rejects.toThrow('Invalid ID provided. ID must be a positive number.');
        });

        it('should throw an error if the event is not found', async () => {
            mockEventDbGetEventById.mockResolvedValue(null);

            await expect(eventService.getEventById(1)).rejects.toThrow('Event not found.');
        });
    });

    describe('getEventsByUserEmail', () => {
        it('should return events by user email', async () => {
            const tickets = [{ event: validEventData }];
            mockTicketDbGetTicketsByUserEmail.mockResolvedValue(tickets);

            const events = await eventService.getEventsByUserEmail('john.doe@example.com');

            expect(mockTicketDbGetTicketsByUserEmail).toHaveBeenCalledTimes(1);
            expect(events).toEqual([validEventData]);
        });

        it('should throw an error if the email format is invalid', async () => {
            await expect(eventService.getEventsByUserEmail('invalid-email')).rejects.toThrow('Invalid email format.');
        });
    });

    describe('createEvent', () => {
        it('should create a new event', async () => {
            const event = new Event(validEventData);
            mockEventDbCreateEvent.mockResolvedValue(validEventData);

            const createdEvent = await eventService.createEvent(event);

            expect(mockEventDbCreateEvent).toHaveBeenCalledTimes(1);
            expect(createdEvent).toEqual(validEventData);
        });

        it('should throw an error if required fields are missing', async () => {
            const event = {
                getName: () => '',
                getDescription: () => 'Let’s celebrate Christmas',
                getDate: () => new Date(),
                getLocation: () => 'Brussels',
                getCategory: () => 'Private',
                getBackgroundImage: () => 'url',
                getIsTrending: () => true,
            } as Event;
            await expect(eventService.createEvent(event)).rejects.toThrow('Missing required fields.');
        });

        it('should throw an error if the event date is in the past', async () => {
            const event = new Event({ ...validEventData, date: new Date('2000-01-01') });
            await expect(eventService.createEvent(event)).rejects.toThrow('Event date cannot be in the past.');
        });
    });
});