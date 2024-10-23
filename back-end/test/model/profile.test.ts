import { Profile } from '../../model/profile';

test('Given valid profile when making a new profile then profile is created', () => {
    const profile = new Profile({
        firstName: 'John',
        lastName: 'Doe',
        email: 'John.Doe@gmail.com',
        age: 20,
        administrator: false,
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
        });
    }).toThrow('Age is required.');
});
