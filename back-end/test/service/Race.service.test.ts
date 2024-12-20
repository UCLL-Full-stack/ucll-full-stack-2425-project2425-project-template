import raceDb from '../../repository/Race.db';
import raceService from '../../service/Race.service';
import { RaceInput, CrashInput } from '../../types';
import { Race } from '../../model/Race';
import { Crash } from '../../model/Crash';
import { Participant } from '../../model/Participant';
import { Driver } from '../../model/Driver';
import { Racecar } from '../../model/Racecar';

const raceInput: RaceInput = {
    name: 'Grand Prix',
    type: 'Formula 1',
    description: 'A high-speed race',
    location: 'Monaco',
    date: new Date('2021-05-23'),
    crashes: [],
};

const crashInput: CrashInput = {
    type: 'Collision',
    description: 'A severe crash',
    casualties: 5,
    deaths: 2,
    participants: [
        {
            driver: {
                name: 'Lewis',
                surname: 'Hamilton',
                birthdate: new Date('1985-01-07'),
                team: 'Mercedes',
                country: 'UK',
                description: 'A skilled driver',
            },
            racecar: {
                name: 'Mercedes W12',
                type: 'Formula 1',
                brand: 'Mercedes',
                hp: 1000,
            },
        },
    ],
};

let createRaceMock: jest.Mock;
let getAllRacesMock: jest.Mock;
let getRaceByIdMock: jest.Mock;
let addCrashToRaceMock: jest.Mock;
let removeCrashFromRaceMock: jest.Mock;
let editCrashMock: jest.Mock;

beforeEach(() => {
    createRaceMock = jest.fn();
    getAllRacesMock = jest.fn();
    getRaceByIdMock = jest.fn();
    addCrashToRaceMock = jest.fn();
    removeCrashFromRaceMock = jest.fn();
    editCrashMock = jest.fn();

    raceDb.createRace = createRaceMock;
    raceDb.getAllRaces = getAllRacesMock;
    raceDb.getRaceById = getRaceByIdMock;
    raceDb.addCrashToRace = addCrashToRaceMock;
    raceDb.removeCrashFromRace = removeCrashFromRaceMock;
    raceDb.editCrash = editCrashMock;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given a race with no name, when race is created, then an error is thrown', async () => {
    // Given
    const invalidRaceInput = { ...raceInput, name: '' };

    // When / Then
    await expect(raceService.createRace(invalidRaceInput)).rejects.toThrowError('Race name is required');
});

test('given a valid race ID, when getRaceById is called, then the race is returned', async () => {
    // Given
    const raceId = 1;
    const race = new Race({
        ...raceInput,
        crashes: (raceInput.crashes || []).map(crashInput => new Crash({
            ...crashInput,
            participants: crashInput.participants.map(participantInput => new Participant({
                driver: new Driver(participantInput.driver),
                racecar: new Racecar(participantInput.racecar),
            })),
        }))
    });
    getRaceByIdMock.mockReturnValue(race);

    // When
    const result = await raceService.getRaceById(raceId);

    // Then
    expect(getRaceByIdMock).toHaveBeenCalledTimes(1);
    expect(getRaceByIdMock).toHaveBeenCalledWith(raceId);
    expect(result).toEqual(race);
});

test('given a valid race ID, when addCrashToRace is called, then the crash is added to the race', async () => {
    // Given
    const raceId = 1;
    const crash = new Crash({
        ...crashInput,
        participants: crashInput.participants.map(participantInput => new Participant({
            driver: new Driver(participantInput.driver),
            racecar: new Racecar(participantInput.racecar),
        })),
    });
    addCrashToRaceMock.mockReturnValue(new Race({ ...raceInput, crashes: [crash] }));

    // When
    const result = await raceService.addCrashToRace(raceId, crashInput);

    // Then
    expect(addCrashToRaceMock).toHaveBeenCalledTimes(1);
    expect(addCrashToRaceMock).toHaveBeenCalledWith(raceId, expect.objectContaining(crashInput));
    expect(result).toEqual(expect.objectContaining({
        name: raceInput.name,
        type: raceInput.type,
        description: raceInput.description,
        location: raceInput.location,
        date: raceInput.date,
        crashes: [crash],
    }));
});

test('given a valid race ID and crash ID, when removeCrashFromRace is called, then the crash is removed from the race', async () => {
    // Given
    const raceId = 1;
    const crashId = 1;
    removeCrashFromRaceMock.mockReturnValue(new Race({
        ...raceInput,
        crashes: [],
    }));

    // When
    const result = await raceService.removeCrashFromRace(raceId, crashId);

    // Then
    expect(removeCrashFromRaceMock).toHaveBeenCalledTimes(1);
    expect(removeCrashFromRaceMock).toHaveBeenCalledWith(raceId, crashId);
    expect(result).toEqual(expect.objectContaining({
        name: raceInput.name,
        type: raceInput.type,
        description: raceInput.description,
        location: raceInput.location,
        date: raceInput.date,
        crashes: [],
    }));
});

test('given a valid crash ID and crash data, when editCrash is called, then the crash is updated', async () => {
    // Given
    const crashId = 1;
    const updatedCrashInput = { ...crashInput, description: 'An updated crash description' };
    const updatedCrash = new Crash({
        ...updatedCrashInput,
        participants: updatedCrashInput.participants.map(participantInput => new Participant({
            driver: new Driver(participantInput.driver),
            racecar: new Racecar(participantInput.racecar),
        })),
    });
    editCrashMock.mockReturnValue(updatedCrash);

    // When
    const result = await raceService.editCrash(crashId, updatedCrashInput);

    // Then
    expect(editCrashMock).toHaveBeenCalledTimes(1);
    expect(editCrashMock).toHaveBeenCalledWith(crashId, expect.objectContaining(updatedCrashInput));
    expect(result).toEqual(updatedCrash);
});