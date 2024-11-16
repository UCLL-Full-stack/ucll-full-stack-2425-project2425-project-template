import exp from 'constants';
import { Event } from '../../model/event';
import { Location } from '../../model/location';
import { Category } from '../../model/category';

const testLocation = new Location({
    street: 'Teststraat',
    number: 1,
    city: 'Brussel',
    country: 'Belgium',
});
const testCategory = new Category({ name: 'Concert', description: 'Concert of artist' });

test('Given valid event when making new event then event is created', () => {
    const creationDate = new Date();
    const date = new Date(3000, 11, 2);
    const event = new Event({
        name: 'Pukkelpop',
        date: date,
        price: 42.5,
        minParticipants: 500,
        maxParticipants: 5000,
        location: testLocation,
        category: testCategory,
    });

    event.setDateCreated(creationDate);
    event.setLastEdit(creationDate);

    expect(event.getName()).toEqual('Pukkelpop');
    expect(event.getDate()).toEqual(date);
    expect(event.getPrice()).toEqual(42.5);
    expect(event.getMinParticipants()).toEqual(500);
    expect(event.getMaxParticipants()).toEqual(5000);
    expect(event.getDateCreated()).toEqual(creationDate);
    expect(event.getLastEdit()).toEqual(creationDate);
});

test('Given empty name when making new event then error is thrown', () => {
    const date = new Date(3000, 11, 2);
    expect(() => {
        const event = new Event({
            name: '',
            date: date,
            price: 42.5,
            minParticipants: 500,
            maxParticipants: 5000,
            location: testLocation,
            category: testCategory,
        });
    }).toThrow('Name is required.');
});

test('Given invalid price when making new event then error is thrown', () => {
    const date = new Date(3000, 11, 2);
    expect(() => {
        const event = new Event({
            name: 'Pukkelpop',
            date: date,
            price: -5,
            minParticipants: 500,
            maxParticipants: 5000,
            location: testLocation,
            category: testCategory,
        });
    }).toThrow('Price must be positive.');
});

test('given max participants lower than min when making new event then error is thrown', () => {
    const date = new Date(3000, 11, 2);
    expect(() => {
        const event = new Event({
            name: 'Pukkelpop',
            date: date,
            price: 0,
            minParticipants: 50000,
            maxParticipants: 5000,
            location: testLocation,
            category: testCategory,
        });
    }).toThrow('Minimum participants must be greater than minimum participants.');
});

test('given max participants lower 0 when making new event then error is thrown', () => {
    const date = new Date(3000, 11, 2);
    expect(() => {
        const event = new Event({
            name: 'Pukkelpop',
            date: date,
            price: 0,
            minParticipants: 0,
            maxParticipants: -5,
            location: testLocation,
            category: testCategory,
        });
    }).toThrow('Maximum participants must be positive.');
});

test('given empty max participants when making new event then error is thrown', () => {
    const date = new Date(3000, 11, 2);
    expect(() => {
        const event = new Event({
            name: 'Pukkelpop',
            date: date,
            price: 0,
            minParticipants: 0,
            maxParticipants: 0,
            location: testLocation,
            category: testCategory,
        });
    }).toThrow('Maximum participants is required.');
});

test('given min participants lower 0 when making new event then error is thrown', () => {
    const date = new Date(3000, 11, 2);
    expect(() => {
        const event = new Event({
            name: 'Pukkelpop',
            date: date,
            price: 0,
            minParticipants: -5,
            maxParticipants: 5,
            location: testLocation,
            category: testCategory,
        });
    }).toThrow('Minimum participants must be positive.');
});
