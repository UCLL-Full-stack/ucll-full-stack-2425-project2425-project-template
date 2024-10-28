import coachService from '../../service/coach.service';
import coachDb from '../../repository/coach.db';
import { Coach } from '../../model/coach';
import { fi } from 'date-fns/locale';
import e from 'express';

const validId = 1;
const invalidId = -1;
const validFirstName = 'Jason';
const invalidFirstName = '';
const validLastName = 'Bourne';
const invalidLastName = '';
const validEmail = 'jasonbourne@ucll.be';
const invalidEmail = '';
const validPhoneNumber = '0423456789';
const invalidPhoneNumber = '';

let mockGetAllCoaches: jest.Mock;
let mockGetCoachById: jest.Mock;
let mockCreateCoach: jest.Mock;

beforeEach(() => {
    mockGetAllCoaches = jest.fn();
    mockGetCoachById = jest.fn();
    mockCreateCoach = jest.fn();

    coachDb.getAllCoaches = mockGetAllCoaches;
    coachDb.getCoachById = mockGetCoachById;
    coachDb.createCoach = mockCreateCoach;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('givenValidId_whenGettingCoachById_thenCoachIsReturned', () => {
    // given
    const validCoach = new Coach({
        id: validId,
        firstName: validFirstName,
        lastName: validLastName,
        email: validEmail,
        phoneNumber: validPhoneNumber,
    });

    mockGetCoachById.mockReturnValue(validCoach);

    // when
    const coach = coachService.getCoachById(validId);

    // then
    expect(coach).toEqual(validCoach);
    expect(coach).not.toBeUndefined();
});

test('givenInvalidId_whenGettingCoachById_thenErrorIsThrown', () => {
    // given
    mockGetCoachById.mockReturnValue(undefined);

    // when & then
    expect(() => coachService.getCoachById(invalidId)).toThrow(
        `Coach with id ${invalidId} does not exist.`
    );
});

test('givenAllcoaches_whenGettingAllCoaches_thenAllCoachesAreReturnedSuccessfully', () => {
    // given
    const allCoaches = [
        new Coach({
            id: validId,
            firstName: validFirstName,
            lastName: validLastName,
            email: validEmail,
            phoneNumber: validPhoneNumber,
        }),
    ];

    // when
    mockGetAllCoaches.mockReturnValue(allCoaches);

    // then
    expect(coachService.getAllCoaches()).toEqual(allCoaches);
});

test('givenValidInput_whenCreatingCoach_thenCoachIsCreatedSuccessfully', () => {
    // given
    const coachInput = {
        id: validId,
        firstName: validFirstName,
        lastName: validLastName,
        email: validEmail,
        phoneNumber: validPhoneNumber,
    };
    const coach = new Coach(coachInput);

    // when
    mockCreateCoach.mockReturnValue(coach);
    const createdCoach = coachService.createCoach(coachInput);


    // then
    expect(createdCoach).toEqual(coach);
});

test('givenInvalidId_whenCreatingCoach_thenErrorIsThrown', () => {
    // given
    const coachInput = {
        id: invalidId,
        firstName: validFirstName,
        lastName: validLastName,
        email: validEmail,
        phoneNumber: validPhoneNumber,
    };

    // when & then
    expect(() => coachService.createCoach(coachInput)).toThrow('Invalid id.');
});

test('givenExistingCoachId_whenCreatingCoach_thenErrorIsThrown', () => {
    // given
    const coachInput = {
        id: validId,
        firstName: validFirstName,
        lastName: validLastName,
        email: validEmail,
        phoneNumber: validPhoneNumber,
    };

    // when
    const existingCoach = new Coach(coachInput);
    mockGetAllCoaches.mockReturnValue([existingCoach]);

    // then
    expect(() => coachService.createCoach(coachInput)).toThrow(
        `Coach with id ${validId} already exists.`
    );
});

test('givenInvalidFirstName_whenCreatingCoach_thenErrorIsThrown', () => {
    // given
    const coachInput = {
        id: validId,
        firstName: invalidFirstName,
        lastName: validLastName,
        email: validEmail,
        phoneNumber: validPhoneNumber,
    };

    // when & then
    expect(() => coachService.createCoach(coachInput)).toThrow('First name is required.');
});

test('givenInvalidLastName_whenCreatingCoach_thenErrorIsThrown', () => {
    // given
    const coachInput = {
        id: validId,
        firstName: validFirstName,
        lastName: invalidLastName,
        email: validEmail,
        phoneNumber: validPhoneNumber,
    };

    // when & then
    expect(() => coachService.createCoach(coachInput)).toThrow('Last name is required.');
});

test('givenInvalidEmail_whenCreatingCoach_thenErrorIsThrown', () => {
    // given
    const coachInput = {
        id: validId,
        firstName: validFirstName,
        lastName: validLastName,
        email: invalidEmail,
        phoneNumber: validPhoneNumber,
    };

    // when & then
    expect(() => coachService.createCoach(coachInput)).toThrow('Email is required.');
});

test('givenInvalidPhoneNumber_whenCreatingCoach_thenErrorIsThrown', () => {
    // given
    const coachInput = {
        id: validId,
        firstName: validFirstName,
        lastName: validLastName,
        email: validEmail,
        phoneNumber: invalidPhoneNumber,
    };

    // when & then
    expect(() => coachService.createCoach(coachInput)).toThrow('Phone number is required.');
});