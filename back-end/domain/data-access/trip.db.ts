import { Trip } from '../model/trip';

// Dummy data
const trips: Trip[] = [
    new Trip({ id: 1, description: 'Beach getaway', location: 'Hawaii', startDate: new Date('2023-07-01'), endDate: new Date('2023-07-10'), price: 1500 }),
    new Trip({ id: 2, description: 'Mountain hiking', location: 'Rocky Mountains', startDate: new Date('2023-08-15'), endDate: new Date('2023-08-20'), price: 900 }),
];

// Create
export const createTrip = (trip: Trip): Trip => {
    trips.push(trip);
    return trip;
};

// Read
export const findAllTrips = (): Trip[] => {
    return trips;
};

export const findTripById = (id: number): Trip | undefined => {
    return trips.find(trip => trip.getId() === id);
};

