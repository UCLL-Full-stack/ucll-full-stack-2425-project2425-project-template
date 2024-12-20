import ticketService from '../../service/ticket.service';
import ticketDb from '../../repository/ticket.db';
import { Ticket } from '../../model/ticket';
import { Event } from '../../model/event';
import { User } from '../../model/user';

jest.mock('../../repository/ticket.db');

const mockTicketDbGetAllTickets = ticketDb.getAllTickets as jest.Mock;
const mockTicketDbGetTicketsByEventId = ticketDb.getTicketsByEventId as jest.Mock;
const mockTicketDbGetTicketsByUserEmail = ticketDb.getTicketsByUserEmail as jest.Mock;
const mockTicketDbUserBuyTicket = ticketDb.userBuyTicket as jest.Mock;
const mockTicketDbRemoveUserFromTicket = ticketDb.removeUserFromTicket as jest.Mock;
const mockTicketDbCreateTicket = ticketDb.createTicket as jest.Mock;

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
    type: 'VIP',
    cost: 100,
    user: validUser,
    event: validEvent,
};

describe('Ticket Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAllTickets', () => {
        it('should return all tickets', async () => {
            mockTicketDbGetAllTickets.mockResolvedValue([validTicketData]);

            const tickets = await ticketService.getAllTickets();

            expect(mockTicketDbGetAllTickets).toHaveBeenCalledTimes(1);
            expect(tickets).toEqual([validTicketData]);
        });
    });

    describe('getTicketsByEventId', () => {
        it('should return tickets by event ID', async () => {
            mockTicketDbGetTicketsByEventId.mockResolvedValue([validTicketData]);

            const tickets = await ticketService.getTicketsByEventId(1);

            expect(mockTicketDbGetTicketsByEventId).toHaveBeenCalledTimes(1);
            expect(tickets).toEqual([validTicketData]);
        });

        it('should throw an error if the event ID is invalid', async () => {
            await expect(ticketService.getTicketsByEventId(-1)).rejects.toThrow('EventId must be a positive number and cannot be empty.');
            await expect(ticketService.getTicketsByEventId(0)).rejects.toThrow('EventId must be a positive number and cannot be empty.');
            await expect(ticketService.getTicketsByEventId(NaN)).rejects.toThrow('EventId must be a positive number and cannot be empty.');
        });
    });

    describe('getTicketsByUserEmail', () => {
        it('should return tickets by user email', async () => {
            mockTicketDbGetTicketsByUserEmail.mockResolvedValue([validTicketData]);

            const tickets = await ticketService.getTicketsByUserEmail('john.doe@example.com');

            expect(mockTicketDbGetTicketsByUserEmail).toHaveBeenCalledTimes(1);
            expect(tickets).toEqual([validTicketData]);
        });

        it('should throw an error if the email format is invalid', async () => {
            await expect(ticketService.getTicketsByUserEmail('invalid-email')).rejects.toThrow('Invalid email format.');
        });
    });

    describe('userBuyTicket', () => {
        it('should allow a user to buy a ticket', async () => {
            mockTicketDbUserBuyTicket.mockResolvedValue(validTicketData);

            const ticket = await ticketService.userBuyTicket(1, 'john.doe@example.com');

            expect(mockTicketDbUserBuyTicket).toHaveBeenCalledTimes(1);
            expect(ticket).toEqual(validTicketData);
        });

        it('should throw an error if the ticket ID is invalid', async () => {
            await expect(ticketService.userBuyTicket(-1, 'john.doe@example.com')).rejects.toThrow('Ticket ID must be a positive number.');
            await expect(ticketService.userBuyTicket(0, 'john.doe@example.com')).rejects.toThrow('Ticket ID must be a positive number.');
            await expect(ticketService.userBuyTicket(NaN, 'john.doe@example.com')).rejects.toThrow('Ticket ID must be a positive number.');
        });

        it('should throw an error if the email format is invalid', async () => {
            await expect(ticketService.userBuyTicket(1, 'invalid-email')).rejects.toThrow('Email must be a valid non-empty string.');
        });
    });

    describe('removeUserFromTicket', () => {
        it('should remove a user from a ticket', async () => {
            mockTicketDbRemoveUserFromTicket.mockResolvedValue(validTicketData);

            const ticket = await ticketService.removeUserFromTicket('1');

            expect(mockTicketDbRemoveUserFromTicket).toHaveBeenCalledTimes(1);
            expect(ticket).toEqual(validTicketData);
        });

        it('should throw an error if the ticket ID is invalid', async () => {
            await expect(ticketService.removeUserFromTicket('')).rejects.toThrow('Invalid ticket ID');
        });
    });

    describe('createTicket', () => {
        it('should create a new ticket', async () => {
            mockTicketDbCreateTicket.mockResolvedValue(validTicketData);

            const ticket = await ticketService.createTicket('VIP', 100, validEvent);

            expect(mockTicketDbCreateTicket).toHaveBeenCalledTimes(1);
            expect(ticket).toEqual(validTicketData);
        });

        it('should throw an error if the ticket type is invalid', async () => {
            await expect(ticketService.createTicket('', 100, validEvent)).rejects.toThrow('Invalid ticket type');
        });

        it('should throw an error if the ticket cost is invalid', async () => {
            await expect(ticketService.createTicket('VIP', -100, validEvent)).rejects.toThrow('Invalid ticket cost');
        });

        it('should throw an error if the event is invalid', async () => {
            mockTicketDbCreateTicket.mockRejectedValue(new Error('Invalid event'));
            await expect(ticketService.createTicket('VIP', 100, validEvent)).rejects.toThrow('Invalid event');
        });
    });
});