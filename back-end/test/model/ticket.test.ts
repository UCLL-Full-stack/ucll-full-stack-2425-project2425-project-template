import { Ticket } from '../../model/ticket';
import { User } from '../../model/user';
import { Event } from '../../model/event';
import { TicketType } from '../../types';

describe('Ticket Model', () => {
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

    const validTicketData = {
        id: 1,
        type: 'VIP' as TicketType,
        cost: 100,
        user: validUser,
        event: validEvent,
    };

    describe('Happy Path', () => {
        it('should create a Ticket instance with valid data', () => {
            const ticket = new Ticket(validTicketData);
            expect(ticket.getId()).toBe(validTicketData.id);
            expect(ticket.getType()).toBe(validTicketData.type);
            expect(ticket.getCost()).toBe(validTicketData.cost);
            expect(ticket.getUser()).toBe(validTicketData.user);
            expect(ticket.getEvent()).toBe(validTicketData.event);
        });

        it('should correctly compare two equal Ticket instances', () => {
            const ticket1 = new Ticket(validTicketData);
            const ticket2 = new Ticket(validTicketData);
            expect(ticket1.equals(ticket2)).toBe(true);
        });
    });

    describe('Unhappy Path', () => {
        it('should throw an error if the cost is negative', () => {
            expect(() => {
                new Ticket({ ...validTicketData, cost: -10 });
            }).toThrow('Cost must be a positive number.');
        });

        it('should throw an error if the ticket type is invalid', () => {
            expect(() => {
                new Ticket({ ...validTicketData, type: 'INVALID_TYPE' as TicketType });
            }).toThrow('Invalid ticket type.');
        });

        it('should throw an error if the user is null', () => {
            expect(() => {
                new Ticket({ ...validTicketData, user: null });
            }).toThrow('User must be provided.');
        });

        it('should correctly compare two different Ticket instances', () => {
            const ticket1 = new Ticket(validTicketData);
            const ticket2 = new Ticket({ ...validTicketData, type: 'REGULAR' as TicketType });
            expect(ticket1.equals(ticket2)).toBe(false);
        });
    });
});