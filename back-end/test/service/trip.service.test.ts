// trip.service.test.ts
import tripService from '../../service/trip.service';
import tripDb from '../../repository/trip.db';
import { Trip } from '../../model/trip';

let mockTripDbGetAllTrips: jest.Mock;
let mockTripDbGetTripById: jest.Mock;

beforeEach(() => {
    mockTripDbGetAllTrips = jest.fn();
    mockTripDbGetTripById = jest.fn();

    tripDb.getAllTrips = mockTripDbGetAllTrips;
    tripDb.getTripById = mockTripDbGetTripById;
});

afterEach(() => {
    jest.clearAllMocks();
});

test('should return all trips', async () => {
    // Given
    const mockTrips: Trip[] = [
        new Trip({ id: 1, description: 'Visit the Eiffel Tower', destination: 'France', startDate: new Date(), endDate: new Date(), price: 100 }),
        new Trip({ id: 2, description: 'Explore the British Museum', destination: 'UK', startDate: new Date(), endDate: new Date(), price: 150 }),
    ];

    mockTripDbGetAllTrips.mockResolvedValue(mockTrips);

    // When
    const trips = await tripService.getAllTrips();

    // Then
    expect(trips).toEqual(mockTrips);
    expect(mockTripDbGetAllTrips).toHaveBeenCalled();
});

test('should return a trip by ID', async () => {
    // Given
    const tripId = 1;
    const mockTrip: Trip = new Trip({ id: tripId, description: 'Visit the Eiffel Tower', destination: 'France', startDate: new Date(), endDate: new Date(), price: 100 });

    mockTripDbGetTripById.mockResolvedValue(mockTrip);

    // When
    const trip = await tripService.getTripById(tripId);

    // Then
    expect(trip).toEqual(mockTrip);
    expect(mockTripDbGetTripById).toHaveBeenCalledWith(tripId);
});

test('should throw an error if trip ID does not exist', async () => {
    // Given
    const tripId = 999; 
    mockTripDbGetTripById.mockResolvedValue(null); 

    // When & Then
    await expect(tripService.getTripById(tripId)).rejects.toThrow(`Trip with ID ${tripId} does not exist.`);
});
