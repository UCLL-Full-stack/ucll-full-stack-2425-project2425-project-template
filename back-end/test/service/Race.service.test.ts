import { Driver } from '../../model/driver';
import { Racecar } from '../../model/racecar';
import { Crash } from '../../model/crash';
import raceDb from '../../repository/Race.db';
import driverDb from '../../repository/Driver.db';
import racecarDb from '../../repository/Racecar.db';
import crashDb from '../../repository/Crash.db';
import raceService from '../../service/Race.service';
import { RaceInput, DriverInput, CrashInput, RacecarInput } from '../../types';

const racecarInput: RacecarInput = {
    car_name: 'Mercedes',
    type: 'W11',
    description: "fast car",
    hp: 5000
};

const crashInput: CrashInput = {
    type: 'Collision',
    description: 'A severe crash',
    casualties: 5,
    deaths: 2
};

const driverInput: DriverInput = { 
    name: 'Lewis Hamilton', 
    team: 'Mercedes', 
    description: 'A skilled driver', 
    age: 36, 
    racecar: racecarInput, 
    crash: crashInput, 
    id: 1
};

const raceInput: RaceInput = {
    name: 'Grand Prix',
    type: 'Formula 1',
    description: 'A high-speed race',
    location: 'Monaco',
    drivers: [driverInput],
    crashes: [],
    admin: { id: 1, username: 'adminuser', password: 'adminpassword' },
};

const admin = new Admin({ id: 1, username: 'adminuser', password: 'adminpassword' });
const driver = new Driver({ ...driverInput, racecar: new Racecar(driverInput.racecar), crash: new Crash(driverInput.crash) });

let createRaceMock: jest.Mock;
let mockRaceDbGetAllRaces: jest.Mock;
let mockDriverDbGetDriverById: jest.Mock;
let mockCrashDbGetCrashById: jest.Mock;
let mockAdminDbGetAdminById: jest.Mock;

beforeEach(() => {
    createRaceMock = jest.fn();
    mockRaceDbGetAllRaces = jest.fn();
    mockDriverDbGetDriverById = jest.fn().mockReturnValue(driver);
    mockCrashDbGetCrashById = jest.fn();
    mockAdminDbGetAdminById = jest.fn().mockReturnValue(admin);

    raceDb.createRace = createRaceMock;
    raceDb.getAllRaces = mockRaceDbGetAllRaces;
    driverDb.getDriverById = mockDriverDbGetDriverById;
    crashDb.getCrashById = mockCrashDbGetCrashById;
    adminDb.getAdminById = mockAdminDbGetAdminById;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('given a valid race, when race is created, then race is created with those values', () => {
    // Given
    mockAdminDbGetAdminById.mockReturnValue(admin);

    // When
    const result = raceService.createRace(raceInput);

    // Then
    expect(createRaceMock).toHaveBeenCalledTimes(1);
    expect(createRaceMock).toHaveBeenCalledWith(expect.objectContaining({
        name: raceInput.name,
        type: raceInput.type,
        description: raceInput.description,
        location: raceInput.location,
        drivers: [driver],
        crashes: [],
        admin,
    }));
    expect(result).toEqual(expect.objectContaining({
        name: raceInput.name,
        type: raceInput.type,
        description: raceInput.description,
        location: raceInput.location,
        drivers: [driver],
        crashes: [],
        admin,
    }));
});

test('given a race with no name, when race is created, then an error is thrown', () => {
    // Given
    const invalidRaceInput = { ...raceInput, name: '' };

    // When / Then
    expect(() => raceService.createRace(invalidRaceInput)).toThrowError('Race name is required');
});

test('given a driver with no ID, when race is created, then an error is thrown', () => {
    // Given
    const invalidDriverInput = { ...driverInput, id: undefined };
    const invalidRaceInput = { ...raceInput, drivers: [invalidDriverInput] };

    // When / Then
    expect(() => raceService.createRace(invalidRaceInput)).toThrow('Driver ID is required');
});

test('given a driver not found with ID, when race is created, then an error is thrown', () => {
    // Given
    mockDriverDbGetDriverById.mockReturnValue(null);

    // When / Then
    expect(() => raceService.createRace(raceInput)).toThrow(`Driver not found with ID ${driverInput.id}`);
});

