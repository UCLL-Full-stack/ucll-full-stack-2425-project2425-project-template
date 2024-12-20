import { Invite } from '../../model/invite';
import { User } from '../../model/user';
import { Event } from '../../model/event';
import { InviteStatus } from '../../types';

describe('Invite Model', () => {
    const validUser = new User({
        id: 1,
        username: 'john_doe',
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        age: 30,
        role: 'PARTICIPANT',
        events: [],
    });

    const validEvent = new Event({
        id: 1,
        name: 'Sample Event',
        description: 'This is a sample event description.',
        date: new Date('2025-12-17'),
        location: 'New York',
        category: 'Technology',
        backgroundImage: '/images/sample-event.jpg',
        isTrending: true,
    });

    const validInviteData = {
        id: 1,
        status: 'PENDING' as InviteStatus,
        user: validUser,
        event: validEvent,
    };

    describe('Happy Path', () => {
        it('should create an Invite instance with valid data', () => {
            const invite = new Invite(validInviteData);
            expect(invite.getId()).toBe(validInviteData.id);
            expect(invite.getStatus()).toBe(validInviteData.status);
            expect(invite.getUser()).toBe(validInviteData.user);
            expect(invite.getEvent()).toBe(validInviteData.event);
        });

        it('should correctly compare two equal Invite instances', () => {
            const invite1 = new Invite(validInviteData);
            const invite2 = new Invite(validInviteData);
            expect(invite1.equals(invite2)).toBe(true);
        });
    });

    describe('Unhappy Path', () => {
        it('should throw an error if the user is invalid', () => {
            expect(() => {
                new Invite({ ...validInviteData, user: {} as User });
            }).toThrow('Invalid user provided.');
        });

        it('should throw an error if the event is invalid', () => {
            expect(() => {
                new Invite({ ...validInviteData, event: {} as Event });
            }).toThrow('Invalid event provided.');
        });

        it('should throw an error if the status is invalid', () => {
            expect(() => {
                new Invite({ ...validInviteData, status: 'INVALID_STATUS' as InviteStatus });
            }).toThrow('Invalid status provided.');
        });

        it('should correctly compare two different Invite instances', () => {
            const invite1 = new Invite(validInviteData);
            const invite2 = new Invite({ ...validInviteData, status: 'ACCEPT' as InviteStatus });
            expect(invite1.equals(invite2)).toBe(false);
        });
    });
});