import { User } from '../../model/user';

test('Given user with valid userName and password when making a new user then user is created', () => {
    const user = new User({ userName: 'TestUser', password: 'TestPassword' });
    expect(user.getUserName()).toEqual('TestUser');
    expect(user.getPassword()).toEqual('TestPassword');
});

test('Given user without a userName when making a new user then error is thrown', () => {
    expect(() => {
        const user = new User({ userName: '', password: 'TestPassword' });
    }).toThrow('Username is required.');
});

test('Given user without a password when making new user then error is thrown', () => {
    expect(() => {
        const user = new User({ userName: 'TestUser', password: '' });
    }).toThrow('Password is required.');
});
