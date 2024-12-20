import { User } from '../../model/user';
import { Role } from '../../types';
import { Event } from '../../model/event';

describe('User Model', () => {
    const validUserData = {
        id: 1,
        username: 'john_doe',
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        age: 30,
        role: 'PARTICIPANT' as Role,
        events: [] as Event[],
    };

    describe('Happy Path', () => {
        it('should create a User instance with valid data', () => {
            const user = new User(validUserData);
            expect(user.getId()).toBe(validUserData.id);
            expect(user.getUsername()).toBe(validUserData.username);
            expect(user.getName()).toBe(validUserData.name);
            expect(user.getEmail()).toBe(validUserData.email);
            expect(user.getPassword()).toBe(validUserData.password);
            expect(user.getAge()).toBe(validUserData.age);
            expect(user.getRole()).toBe(validUserData.role);
            expect(user.getFavoriteEvents()).toEqual(validUserData.events);
        });

        it('should correctly compare two equal User instances', () => {
            const user1 = new User(validUserData);
            const user2 = new User(validUserData);
            expect(user1.equals(user2)).toBe(true);
        });
    });

    describe('Unhappy Path', () => {
        it('should throw an error if the password is less than 8 characters', () => {
            expect(() => {
                new User({ ...validUserData, password: 'short' });
            }).toThrow('Password must be at least 8 characters long.');
        });

        it('should throw an error if the name is empty', () => {
            expect(() => {
                new User({ ...validUserData, name: '' });
            }).toThrow('Name can not be empty.');
        });

        it('should throw an error if the username is empty', () => {
            expect(() => {
                new User({ ...validUserData, username: '' });
            }).toThrow('Username can not be empty.');
        });

        it('should throw an error if the age is less than 18', () => {
            expect(() => {
                new User({ ...validUserData, age: 17 });
            }).toThrow('Age needs to be between 18 and 101.');
        });

        it('should throw an error if the age is greater than 101', () => {
            expect(() => {
                new User({ ...validUserData, age: 102 });
            }).toThrow('Age needs to be between 18 and 101.');
        });

        it('should throw an error if the email format is invalid', () => {
            expect(() => {
                new User({ ...validUserData, email: 'invalid-email' });
            }).toThrow('Email must be in a valid format.');
        });

        it('should correctly compare two different User instances', () => {
            const user1 = new User(validUserData);
            const user2 = new User({ ...validUserData, username: 'different_username' });
            expect(user1.equals(user2)).toBe(false);
        });
    });
});