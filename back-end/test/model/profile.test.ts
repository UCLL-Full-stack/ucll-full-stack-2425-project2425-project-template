import { Profile } from '../../model/profile';
import { Location } from '../../model/location';
import { Category } from '../../model/category';
import { Event } from '../../model/event';

const testLocation = new Location({
    street: 'Teststraat',
    number: 1,
    city: 'Brussel',
    country: 'Belgium',
});
const testCategory = new Category({ name: 'Concert', description: 'Concert of artist' });

test('Given valid profile when making a new profile then profile is created', () => {
    const profile = new Profile({
        firstName: 'John',
        lastName: 'Doe',
        age: 20,
        location: testLocation,
        category: testCategory,
    });
    expect(profile.getFirstName()).toEqual('John');
    expect(profile.getLastName()).toEqual('Doe');
    expect(profile.getAge()).toEqual(20);
});

test('Given profile without firstName when making a new profile then error is thrown', () => {
    expect(() => {
        const profile = new Profile({
            firstName: '',
            lastName: 'Doe',
            age: 20,
            location: testLocation,
            category: testCategory,
        });
    }).toThrow('First name is required.');
});

test('Given profile without lastName when making a new profile then error is thrown', () => {
    expect(() => {
        const profile = new Profile({
            firstName: 'John',
            lastName: '',
            age: 20,
            location: testLocation,
            category: testCategory,
        });
    }).toThrow('Last name is required.');
});

test('Given profile with invalid age when making a new profile then error is thrown', () => {
    expect(() => {
        const profile = new Profile({
            firstName: 'John',
            lastName: 'Doe',
            age: 0,
            location: testLocation,
            category: testCategory,
        });
    }).toThrow('Age is required.');
});

test('Given user and event, when participating to an event, then event gets added to list of event in user', () => {
    const profile = new Profile({
        firstName: 'John',
        lastName: 'Doe',
        age: 20,
        location: testLocation,
        category: testCategory,
    });
    const creationDate = new Date();
    const date = new Date(3000, 11, 2);
    const event = new Event({
        name: 'Pukkelpop',
        date: date,
        price: 42.5,
        minParticipants: 500,
        maxParticipants: 5000,
        location: new Location({ street: 'teststreet', number: 5, city: 'test', country: 'test' }),
        category: new Category({ name: 'test', description: 'description' }),
    });

    profile.addEvent(event);
    expect(profile.getEvents()).toEqual([event]);
});
