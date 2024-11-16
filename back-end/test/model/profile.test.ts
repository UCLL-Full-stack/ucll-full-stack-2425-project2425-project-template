import { Profile } from '../../model/profile';
import { Location } from '../../model/location';
import { Category } from '../../model/category';

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
        email: 'John.Doe@gmail.com',
        age: 20,
        administrator: false,
        location: testLocation,
        category: testCategory,
    });
    expect(profile.getFirstName()).toEqual('John');
    expect(profile.getLastName()).toEqual('Doe');
    expect(profile.getEmail()).toEqual('John.Doe@gmail.com');
    expect(profile.getAge()).toEqual(20);
    expect(profile.isAdmin()).toEqual(false);
});

test('Given profile without firstName when making a new profile then error is thrown', () => {
    expect(() => {
        const profile = new Profile({
            firstName: '',
            lastName: 'Doe',
            email: 'John.Doe@gmail.com',
            age: 20,
            administrator: false,
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
            email: 'John.Doe@gmail.com',
            age: 20,
            administrator: false,
            location: testLocation,
            category: testCategory,
        });
    }).toThrow('Last name is required.');
});

test('Given profile without email when making a new profile then error is thrown', () => {
    expect(() => {
        const profile = new Profile({
            firstName: 'John',
            lastName: 'Doe',
            email: '',
            age: 20,
            administrator: false,
            location: testLocation,
            category: testCategory,
        });
    }).toThrow('Email is required.');
});

test('Given profile with invalid age when making a new profile then error is thrown', () => {
    expect(() => {
        const profile = new Profile({
            firstName: 'John',
            lastName: 'Doe',
            email: 'John.Doe@gmail.com',
            age: 0,
            administrator: false,
            location: testLocation,
            category: testCategory,
        });
    }).toThrow('Age is required.');
});
