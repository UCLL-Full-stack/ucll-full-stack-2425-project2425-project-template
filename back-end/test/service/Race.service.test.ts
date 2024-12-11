import raceDb from '../../repository/Race.db';
import raceService from '../../service/Race.service';
import { RaceInput } from '../../types';

const raceInput: RaceInput = {
    name: 'Grand Prix',
    type: 'Formula 1',
    description: 'A high-speed race',
    location: 'Monaco',
    date: new Date('2021-05-23'), 
    crashes: [],
};

let createRaceMock: jest.Mock;

beforeEach(() => {
    createRaceMock = jest.fn();

    raceDb.createRace = createRaceMock;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given a valid race, when race is created, then race is created with those values', async () => {
    // Given

    // When
    const result = await raceService.createRace(raceInput);

    // Then
    expect(createRaceMock).toHaveBeenCalledTimes(1);
    expect(createRaceMock).toHaveBeenCalledWith(expect.objectContaining({
        race: expect.objectContaining({
            name: raceInput.name,
            type: raceInput.type,
            description: raceInput.description,
            location: raceInput.location,
            date: raceInput.date,
            crashes: [],
        })
    }));
    expect(result).toEqual(expect.objectContaining({
        name: raceInput.name,
        type: raceInput.type,
        description: raceInput.description,
        location: raceInput.location,
        date: raceInput.date,
        crashes: [],
    }));
});

test('given a race with no name, when race is created, then an error is thrown', async () => {
    // Given
    const invalidRaceInput = { ...raceInput, name: '' };

    // When / Then
    await expect(raceService.createRace(invalidRaceInput)).rejects.toThrowError('Race name is required');
});

