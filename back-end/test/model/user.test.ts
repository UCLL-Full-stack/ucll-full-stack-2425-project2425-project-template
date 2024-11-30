import { User } from '../../model/user';
import { Profile } from '../../model/profile';
import { Location } from '../../model/location';
import { Category } from '../../model/category';
import Event from '../../model/event';

const profile = new Profile({
    firstName: 'John',
    lastName: 'Doe',
    email: 'John.Doe@gmail.com',
    age: 20,
    administrator: false,
    location: new Location({ street: 'test', number: 1, city: 'test', country: 'test' }),
    category: new Category({ name: 'test', description: 'test' }),
});

test('Given user with valid userName and password when making a new user then user is created', () => {
    const user = new User({ userName: 'TestUser', password: 'TestPassword', profile: profile });
    expect(user.getUserName()).toEqual('TestUser');
    expect(user.getPassword()).toEqual('TestPassword');
});

test('Given user without a userName when making a new user then error is thrown', () => {
    expect(() => {
        const user = new User({ userName: '', password: 'TestPassword', profile: profile });
    }).toThrow('Username is required.');
});

test('Given user without a password when making new user then error is thrown', () => {
    expect(() => {
        const user = new User({ userName: 'TestUser', password: '', profile: profile });
    }).toThrow('Password is required.');
});
