import { User } from '../../model/user';
import { Profile } from '../../model/profile';
import { Location } from '../../model/location';
import { Category } from '../../model/category';
import Event from '../../model/event';

const profile = new Profile({
    firstName: 'John',
    lastName: 'Doe',
    age: 20,
    location: new Location({ street: 'test', number: 1, city: 'test', country: 'test' }),
    category: new Category({ name: 'test', description: 'test' }),
});

test('Given a valid user when making a new user then user is created', () => {
    const user = new User({
        userName: 'TestUser',
        email: 'testEmail@gmail.com',
        role: 'User',
        password: 'TestPassword',
        profile: profile,
    });
    expect(user.getUserName()).toEqual('TestUser');
    expect(user.getPassword()).toEqual('TestPassword');
});

test('Given user without an userName when making a new user then error is thrown', () => {
    expect(() => {
        const user = new User({
            userName: '',
            email: 'test@gmail.com',
            role: 'User',
            password: 'TestPassword',
            profile: profile,
        });
    }).toThrow('Username is required.');
});
test('Given user without an email when making a new user then error is thrown', () => {
    expect(() => {
        const user = new User({
            userName: 'Testuser',
            email: '',
            role: 'User',
            password: 'TestPassword',
            profile: profile,
        });
    }).toThrow('Email is required.');
});
test('Given user with invalid email when making a new user then error is thrown', () => {
    expect(() => {
        const user = new User({
            userName: 'Testuser',
            email: 'testemail',
            role: 'User',
            password: 'TestPassword',
            profile: profile,
        });
    }).toThrow('Email is not of right format.');
});

test('Given user without a password when making new user then error is thrown', () => {
    expect(() => {
        const user = new User({
            userName: 'TestUser',
            email: 'test@gmail.com',
            role: 'User',
            password: '',
            profile: profile,
        });
    }).toThrow('Password is required.');
});
