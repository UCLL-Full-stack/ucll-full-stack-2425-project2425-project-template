import inviteService from '../../service/invite.service';
import inviteDb from '../../repository/invite.db';
import userDb from '../../repository/user.db';
import eventDb from '../../repository/event.db';
import { Invite } from '../../model/invite';
import { User } from '../../model/user';
import { Event } from '../../model/event';

jest.mock('../../repository/invite.db');
jest.mock('../../repository/user.db');
jest.mock('../../repository/event.db');

const mockInviteDbGetAll = inviteDb.getAll as jest.Mock;
const mockInviteDbCreateInvite = inviteDb.createInvite as jest.Mock;
const mockInviteDbGetInvitesByEventId = inviteDb.getInvitesByEventId as jest.Mock;
const mockInviteDbGetInvitesByUserEmail = inviteDb.getInvitesByUserEmail as jest.Mock;
const mockInviteDbChangeInviteStatus = inviteDb.changeInviteStatus as jest.Mock;
const mockInviteDbCheckInviteExisted = inviteDb.checkInviteExisted as jest.Mock;
const mockUserDbGetUserByEmail = userDb.getUserByEmail as jest.Mock;
const mockEventDbGetEventById = eventDb.getEventById as jest.Mock;

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
    status: 'PENDING',
    user: validUser,
    event: validEvent,
};

describe('Invite Service', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe('getAll', () => {
        it('should return all invites', async () => {
            mockInviteDbGetAll.mockResolvedValue([validInviteData]);

            const invites = await inviteService.getAll();

            expect(mockInviteDbGetAll).toHaveBeenCalledTimes(1);
            expect(invites).toEqual([validInviteData]);
        });
    });

    describe('createInvite', () => {
        it('should create a new invite', async () => {
            mockUserDbGetUserByEmail.mockResolvedValue(validUser);
            mockEventDbGetEventById.mockResolvedValue(validEvent);
            mockInviteDbCheckInviteExisted.mockResolvedValue(false);
            mockInviteDbCreateInvite.mockResolvedValue(validInviteData);

            const invite = await inviteService.createInvite('john.doe@example.com', '1');

            expect(mockUserDbGetUserByEmail).toHaveBeenCalledTimes(1);
            expect(mockEventDbGetEventById).toHaveBeenCalledTimes(1);
            expect(mockInviteDbCheckInviteExisted).toHaveBeenCalledTimes(1);
            expect(mockInviteDbCreateInvite).toHaveBeenCalledTimes(1);
            expect(invite).toEqual(validInviteData);
        });

        it('should throw an error if the email format is invalid', async () => {
            await expect(inviteService.createInvite('invalid-email', '1')).rejects.toThrow('Invalid email format.');
        });

        it('should throw an error if the event ID is invalid', async () => {
            await expect(inviteService.createInvite('john.doe@example.com', '-1')).rejects.toThrow('Invalid ID provided. ID must be a positive number.');
        });

        it('should throw an error if the user is not found', async () => {
            mockUserDbGetUserByEmail.mockResolvedValue(null);

            await expect(inviteService.createInvite('john.doe@example.com', '1')).rejects.toThrow('User not found.');
        });

        it('should throw an error if the invite already exists', async () => {
            mockUserDbGetUserByEmail.mockResolvedValue(validUser);
            mockEventDbGetEventById.mockResolvedValue(validEvent);
            mockInviteDbCheckInviteExisted.mockResolvedValue(true);

            await expect(inviteService.createInvite('john.doe@example.com', '1')).rejects.toThrow(`User [${validUser.getName()}] has already been invited to ${validEvent.getName()}.`);
        });
    });

    describe('getInvitesByEventId', () => {
        it('should return invites by event ID', async () => {
            mockInviteDbGetInvitesByEventId.mockResolvedValue([validInviteData]);

            const invites = await inviteService.getInvitesByEventId('1');

            expect(mockInviteDbGetInvitesByEventId).toHaveBeenCalledTimes(1);
            expect(invites).toEqual([validInviteData]);
        });

        it('should throw an error if the event ID is invalid', async () => {
            await expect(inviteService.getInvitesByEventId('')).rejects.toThrow('EventId must be a string and cannot be empty.');
        });
    });

    describe('getInvitesByUserEmail', () => {
        it('should return invites by user email', async () => {
            mockInviteDbGetInvitesByUserEmail.mockResolvedValue([validInviteData]);

            const invites = await inviteService.getInvitesByUserEmail('john.doe@example.com');

            expect(mockInviteDbGetInvitesByUserEmail).toHaveBeenCalledTimes(1);
            expect(invites).toEqual([validInviteData]);
        });

        it('should throw an error if the email format is invalid', async () => {
            await expect(inviteService.getInvitesByUserEmail('invalid-email')).rejects.toThrow('Invalid email format.');
        });
    });

    describe('changeInviteStatus', () => {
        it('should change the invite status', async () => {
            mockInviteDbChangeInviteStatus.mockResolvedValue(validInviteData);

            const invite = await inviteService.changeInviteStatus('1', 'ACCEPT');

            expect(mockInviteDbChangeInviteStatus).toHaveBeenCalledTimes(1);
            expect(invite).toEqual(validInviteData);
        });

        it('should throw an error if the invite ID is invalid', async () => {
            await expect(inviteService.changeInviteStatus('', 'ACCEPT')).rejects.toThrow('inviteId must be a non-empty string.');
        });
    });
});