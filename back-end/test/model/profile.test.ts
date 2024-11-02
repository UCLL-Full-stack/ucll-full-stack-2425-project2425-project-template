import { Profile } from '../../model/profile';
import { User } from '../../model/user';

describe('Profile Class', () => {
    test('should create a Profile instance', () => {
        const user = new User({
            id: 1,
            username: 'testuser',
            password: 'password',
            profile: {} as Profile, 
        });

        const profile = new Profile({
            id: 1,
            firstName: 'Test',
            lastName: 'User',
            email: 'test@example.com',
            user: user,
        });

        user.setProfile(profile);

        expect(profile.getId()).toBe(1);
        expect(profile.getFirstName()).toBe('Test');
        expect(profile.getLastName()).toBe('User');
        expect(profile.getEmail()).toBe('test@example.com');
        expect(profile.getUser()).toBe(user);
    });

    test('should throw an error if first name is missing', () => {
        const user = new User({
            id: 1,
            username: 'testuser',
            password: 'password',
            profile: {} as Profile, 
        });

        expect(() => {
            new Profile({
                id: 1,
                firstName: '',
                lastName: 'User',
                email: 'test@example.com',
                user: user,
            });
        }).toThrow('First name is required and cannot be empty');
    });

    test('should throw an error if last name is missing', () => {
        const user = new User({
            id: 1,
            username: 'testuser',
            password: 'password',
            profile: {} as Profile, 
        });

        expect(() => {
            new Profile({
                id: 1,
                firstName: 'Test',
                lastName: '',
                email: 'test@example.com',
                user: user,
            });
        }).toThrow('Last name is required and cannot be empty');
    });

    test('should throw an error if email is missing', () => {
        const user = new User({
            id: 1,
            username: 'testuser',
            password: 'password',
            profile: {} as Profile, 
        });

        expect(() => {
            new Profile({
                id: 1,
                firstName: 'Test',
                lastName: 'User',
                email: '',
                user: user,
            });
        }).toThrow('Email is required and cannot be empty');
    });

    test('should throw an error if user is not an instance of User', () => {
        expect(() => {
            new Profile({
                id: 1,
                firstName: 'Test',
                lastName: 'User',
                email: 'test@example.com',
                user: {} as User,
            });
        }).toThrow('User must be an instance of User');
    });

    test('should set and get first name', () => {
        const user = new User({
            id: 1,
            username: 'testuser',
            password: 'password',
            profile: {} as Profile, 
        });

        const profile = new Profile({
            id: 1,
            firstName: 'Test',
            lastName: 'User',
            email: 'test@example.com',
            user: user,
        });

        profile.setFirstName('NewFirstName');
        expect(profile.getFirstName()).toBe('NewFirstName');
    });

    test('should set and get last name', () => {
        const user = new User({
            id: 1,
            username: 'testuser',
            password: 'password',
            profile: {} as Profile, 
        });

        const profile = new Profile({
            id: 1,
            firstName: 'Test',
            lastName: 'User',
            email: 'test@example.com',
            user: user,
        });

        profile.setLastName('NewLastName');
        expect(profile.getLastName()).toBe('NewLastName');
    });

    test('should set and get email', () => {
        const user = new User({
            id: 1,
            username: 'testuser',
            password: 'password',
            profile: {} as Profile, // Placeholder, will be set later
        });

        const profile = new Profile({
            id: 1,
            firstName: 'Test',
            lastName: 'User',
            email: 'test@example.com',
            user: user,
        });

        profile.setEmail('newemail@example.com');
        expect(profile.getEmail()).toBe('newemail@example.com');
    });

    test('should set and get user', () => {
        const user = new User({
            id: 1,
            username: 'testuser',
            password: 'password',
            profile: {} as Profile, 
        });

        const profile = new Profile({
            id: 1,
            firstName: 'Test',
            lastName: 'User',
            email: 'test@example.com',
            user: user,
        });

        const newUser = new User({
            id: 2,
            username: 'newuser',
            password: 'newpassword',
            profile: {} as Profile,
        });

        profile.setUser(newUser);
        expect(profile.getUser()).toBe(newUser);
    });
});
