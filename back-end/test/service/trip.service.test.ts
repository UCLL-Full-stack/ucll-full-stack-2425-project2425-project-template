import tripDb from "../../domain/data-access/trip.db";
import { Trip } from "../../domain/model/trip";
import tripService from "../../service/trip.service";
import { TripInput } from "../../types";

let mockTripDbCreateTrip: jest.Mock;
let mockTripDbGetAllTrips: jest.Mock;
let mockTripDbGetTripById: jest.Mock;

beforeEach(() => {
    mockTripDbCreateTrip = jest.fn();
    mockTripDbGetAllTrips = jest.fn();
    mockTripDbGetTripById = jest.fn();
});

afterEach(() => {
    jest.clearAllMocks();
});

const validTripInput: TripInput = {
    description: 'Beach Vacation',
    location: 'Hawaii',
    startDate: new Date('2024-06-01'),
    endDate: new Date('2024-06-10'),
    price: 500,
    destination: "",
    images: ""
};

const trip = new Trip(validTripInput);

test('given a valid trip input, when createTrip is called, then a trip is created with those values', async () => {
    // Given
    tripDb.createTrip = mockTripDbCreateTrip.mockReturnValue(Promise.resolve(trip));

    // When
    const createdTrip = await tripService.createTrip(validTripInput);

    // Then
    expect(mockTripDbCreateTrip).toHaveBeenCalledWith(validTripInput);
    expect(createdTrip).toEqual(trip);
});

test('given an invalid description, when createTrip is called, then an error is thrown', async () => {
    // Given
    const invalidInput = { ...validTripInput, description: '' };

    // When
    const createTrip = async () => await tripService.createTrip(invalidInput);

    // Then
    await expect(createTrip()).rejects.toThrow('Description is required.');
});

test('given an invalid location, when createTrip is called, then an error is thrown', async () => {
    // Given
    const invalidInput = { ...validTripInput, location: '' };

    // When
    const createTrip = async () => await tripService.createTrip(invalidInput);

    // Then
    await expect(createTrip()).rejects.toThrow('Location is required.');
});

test('given an invalid start date, when createTrip is called, then an error is thrown', async () => {
    // Given
    const invalidInput = { ...validTripInput, startDate: undefined };

    // When
    const createTrip = async () => await tripService.createTrip(invalidInput);

    // Then
    await expect(createTrip()).rejects.toThrow('Start date is required.');
});

test('given an invalid end date, when createTrip is called, then an error is thrown', async () => {
    // Given
    const invalidInput = { ...validTripInput, endDate: undefined };

    // When
    const createTrip = async () => await tripService.createTrip(invalidInput);

    // Then
    await expect(createTrip()).rejects.toThrow('End date is required.');
});

test('given an invalid price, when createTrip is called, then an error is thrown', async () => {
    // Given
    const invalidInput = { ...validTripInput, price: -100 };

    // When
    const createTrip = async () => await tripService.createTrip(invalidInput);

    // Then
    await expect(createTrip()).rejects.toThrow('Price must be a positive number.');
});

test('given an error when creating a trip in the database, when createTrip is called, then an error is thrown', async () => {
    // Given
    tripDb.createTrip = mockTripDbCreateTrip.mockImplementation(() => {
        throw new Error('Database error');
    });

    // When
    const createTrip = async () => await tripService.createTrip(validTripInput);

    // Then
    await expect(createTrip()).rejects.toThrow('Trip creation failed due to a database error.');
});

test('when getAllTrips is called, then it retrieves all trips', async () => {
    // Given
    const trips = [trip];
    tripDb.getAllTrips = mockTripDbGetAllTrips.mockReturnValue(Promise.resolve(trips));

    // When
    const result = await tripService.getAllTrips();

    // Then
    expect(mockTripDbGetAllTrips).toHaveBeenCalled();
    expect(result).toEqual(trips);
});

test('given an invalid trip ID, when getTripById is called, then an error is thrown', async () => {
    // When
    const getTrip = async () => await tripService.getTripById(-1);

    // Then
    await expect(getTrip()).rejects.toThrow("Invalid Trip ID");
});

test('given a non-existent trip ID, when getTripById is called, then an error is thrown', async () => {
    // Given
    const tripId = 1;
    mockTripDbGetTripById.mockReturnValue(Promise.resolve(null));

    // When
    const getTrip = async () => await tripService.getTripById(tripId);

    // Then
    await expect(getTrip()).rejects.toThrow(`Trip with ID ${tripId} does not exist.`);
});

test('when getTripById is called with a valid ID, it returns the trip', async () => {
    // Given
    const tripId = 1;
    mockTripDbGetTripById.mockReturnValue(Promise.resolve(trip));

    // When
    const result = await tripService.getTripById(tripId);

    // Then
    expect(mockTripDbGetTripById).toHaveBeenCalledWith(tripId);
    expect(result).toEqual(trip);
});
