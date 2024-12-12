import { Category } from '../../model/category';
import Event from '../../model/event';
import { Location } from '../../model/location';
import eventDb from '../../repository/event.db';
import eventService from '../../service/event.service';

const locationInput = {
    id: 1,
    street: 'Teststraat',
    number: 1,
    city: 'Brussel',
    country: 'Belgium',
};

const categoryInput = { id: 1, name: 'Concert', description: 'Concert of artist' };

const eventInput = {
    name: 'Testevent',
    date: new Date(3000, 11, 2),
    price: 5,
    minParticipants: 5,
    maxParticipants: 10,
    location: locationInput,
    category: categoryInput,
};

const testLocation = new Location({
    id: 1,
    street: 'Teststraat',
    number: 1,
    city: 'Brussel',
    country: 'Belgium',
});

const testCategory = new Category({ id: 1, name: 'Concert', description: 'Concert of artist' });

const testEvent = new Event({
    name: 'Testevent',
    date: new Date(3000, 11, 2),
    price: 5,
    minParticipants: 5,
    maxParticipants: 10,
    location: testLocation,
    category: testCategory,
});
//mocking
let addEventMock: jest.Mock;
let getEventsMock: jest.Mock;
let mockEventDbAddEvent: jest.Mock;
let mockEventDbGetEventById: jest.Mock;
let mockEventDbDeleteEventById: jest.Mock;
let mockEventDbEditEvent: jest.Mock;

beforeEach(() => {
    addEventMock = jest.fn();
    getEventsMock = jest.fn();
    mockEventDbAddEvent = jest.fn();
    mockEventDbGetEventById = jest.fn();
    mockEventDbDeleteEventById = jest.fn();
    mockEventDbEditEvent = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});
test('Given a valid event, when adding an event, then event is added', async () => {
    //given
    eventService.addEvent = addEventMock.mockResolvedValue(testEvent);
    eventDb.addEvent = mockEventDbAddEvent.mockResolvedValue(testEvent);
    //when
    await eventService.addEvent(eventInput);
    //then
    expect(addEventMock).toHaveBeenCalledTimes(1);
    expect(addEventMock).toHaveBeenCalledWith(eventInput);
});

test('Given a valid id, when getting an event by id, then an event is returned', async () => {
    //given
    eventDb.getEventById = mockEventDbGetEventById.mockResolvedValue(testEvent);
    //when
    const result = await eventService.getEventById(1);
    //then
    expect(mockEventDbGetEventById).toHaveBeenCalledTimes(1);
    expect(result).toBeInstanceOf(Event);
});
test('Given a invalid id, when getting an event by id, then an error is returned', () => {
    //given
    eventDb.getEventById = mockEventDbGetEventById.mockResolvedValue(null);
    //when
    expect(eventService.getEventById(100000)).rejects.toThrow(
        'Error: No event with id 100000 found.'
    );
    //then
    expect(mockEventDbGetEventById).toHaveBeenCalledTimes(1);
});

test('given the getEvents function, when getting events, then events are returned', async () => {
    //given
    eventService.getEvents = getEventsMock.mockResolvedValue([testEvent, testEvent]);
    //when
    const result = await eventService.getEvents();
    //then
    expect(Array.isArray(result)).toBe(true);
    result.forEach((event) => expect(event).toBeInstanceOf(Event));
});

test('given a normal user, when deleting an event, an error is thrown', () => {
    expect(eventService.deleteEvent(1, 'User')).rejects.toThrow(
        'Error: Only an administrator can delete events.'
    );
});

test('given a admin, when deleting an event, an error is thrown', async () => {
    //given
    eventDb.deleteEventById = mockEventDbDeleteEventById;

    //when
    await eventService.deleteEvent(1, 'Admin');

    expect(mockEventDbDeleteEventById).toHaveBeenCalledTimes(1);
    expect(mockEventDbDeleteEventById).toHaveBeenCalledWith(1);
});

test('given valid eventInput and right role, when editting an event, then event is changed', async () => {
    //given
    eventDb.editEvent = mockEventDbEditEvent;
    const eventInput = {
        id: 1,
        name: 'test',
        date: new Date(),
        price: 5,
        minParticipants: 5,
        maxParticipants: 10,
        location: locationInput,
        category: categoryInput,
    };
    //when
    await eventService.editEvent(1, eventInput, 'Mod');

    expect(mockEventDbEditEvent).toHaveBeenCalledTimes(1);
    expect(mockEventDbEditEvent).toHaveBeenCalledWith(1, eventInput);
});
test('given valid eventInput and false role, when editting an event, then event is changed', async () => {
    //given
    eventDb.editEvent = mockEventDbEditEvent;
    const eventInput = {
        id: 1,
        name: 'test',
        date: new Date(),
        price: 5,
        minParticipants: 5,
        maxParticipants: 10,
        location: locationInput,
        category: categoryInput,
    };
    //when
    await expect(eventService.editEvent(1, eventInput, 'User')).rejects.toThrow(
        'Error: Only an administrator or event moderator can edit events.'
    );

    expect(mockEventDbEditEvent).toHaveBeenCalledTimes(0);
});
