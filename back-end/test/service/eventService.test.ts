import { Category } from '../../model/category';
import Event from '../../model/event';
import { Location } from '../../model/location';
import eventService from '../../service/event.service';

const testLocation = {
    street: 'Teststraat',
    number: 1,
    city: 'Brussel',
    country: 'Belgium',
};
const testCategory = { name: 'Concert', description: 'Concert of artist' };

test('Given a valid event, when adding an event, then event is added', async () => {
    const testEvent = {
        name: 'Testevent',
        date: new Date(3000, 11, 2),
        price: 5,
        minParticipants: 5,
        maxParticipants: 10,
        location: testLocation,
        category: testCategory,
    };

    const result = await eventService.addEvent(testEvent);
    expect(result.getName()).toEqual('Testevent');
    expect(result.getDate()).toEqual(new Date(3000, 11, 2));
    expect(result.getPrice()).toEqual(5);
    expect(result.getMinParticipants()).toEqual(5);
    expect(result.getMaxParticipants()).toEqual(10);
    expect(result.getCategory()).toBeInstanceOf(Category);
    expect(result.getLocation()).toBeInstanceOf(Location);
    expect(result.getDateCreated()).toBeInstanceOf(Date);
    expect(result.getLastEdit()).toBeInstanceOf(Date);
});

test('Given a empty name, when adding an event, then error is thrown', async () => {
    const testEvent = {
        name: '',
        date: new Date(3000, 11, 2),
        price: 5,
        minParticipants: 5,
        maxParticipants: 10,
        location: testLocation,
        category: testCategory,
    };

    await expect(eventService.addEvent(testEvent)).rejects.toThrow('Error: Name is required.');
});

test('Given a negative price, when adding an event, then error is thrown', async () => {
    const testEvent = {
        name: 'TestEvent',
        date: new Date(3000, 11, 2),
        price: -10,
        minParticipants: 5,
        maxParticipants: 10,
        location: testLocation,
        category: testCategory,
    };

    await expect(eventService.addEvent(testEvent)).rejects.toThrow(
        'Error: Price must be positive.'
    );
});
test('Given a negative min participants, when adding an event, then error is thrown', async () => {
    const testEvent = {
        name: 'TestEvent',
        date: new Date(3000, 11, 2),
        price: 1,
        minParticipants: -5,
        maxParticipants: 10,
        location: testLocation,
        category: testCategory,
    };

    await expect(eventService.addEvent(testEvent)).rejects.toThrow(
        'Error: Minimum participants must be positive.'
    );
});
test('Given a negative max participants, when adding an event, then error is thrown', async () => {
    const testEvent = {
        name: 'TestEvent',
        date: new Date(3000, 11, 2),
        price: 1,
        minParticipants: 5,
        maxParticipants: -10,
        location: testLocation,
        category: testCategory,
    };

    await expect(eventService.addEvent(testEvent)).rejects.toThrow(
        'Error: Maximum participants must be positive.'
    );
});

test('Given a negative max participants, when adding an event, then error is thrown', async () => {
    const testEvent = {
        name: 'TestEvent',
        date: new Date(3000, 11, 2),
        price: 1,
        minParticipants: 15,
        maxParticipants: 10,
        location: testLocation,
        category: testCategory,
    };

    await expect(eventService.addEvent(testEvent)).rejects.toThrow(
        'Error: Minimum participants must be greater than minimum participants.'
    );
});

test('Given an id that doesnt exist, when getting an event by id, then error is thrown', async () => {
    await expect(eventService.getEventById(100000)).rejects.toThrow(
        'Error: No event with id 100000 found.'
    );
});

test('Given a valid id, when getting an event by id, then an event is returned', async () => {
    const result = await eventService.getEventById(1);
    expect(result).toBeInstanceOf(Event);
});

test('given the getEvents function, when getting events, then events are returned', async () => {
    const result = await eventService.getEvents();
    expect(Array.isArray(result)).toBe(true);
    result.forEach((event) => expect(event).toBeInstanceOf(Event));
});
