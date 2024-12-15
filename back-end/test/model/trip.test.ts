import { Trip } from '../../model/trip';

const validTripData = {
    description: 'Mountain Adventure',
    destination: 'Himalayas',
    startDate: new Date('2023-10-01'),
    endDate: new Date('2023-10-15'),
    price: 2500,
};

describe('Trip Model', () => {
    test('given: valid values for trip, when: trip is created, then: trip is created with those values', () => {
        // Given
        const trip = new Trip(validTripData);

        // Then
        expect(trip['description']).toEqual(validTripData.description);
        expect(trip['destination']).toEqual(validTripData.destination);
        expect(trip['startDate']).toEqual(validTripData.startDate);
        expect(trip['endDate']).toEqual(validTripData.endDate);
        expect(trip['price']).toEqual(validTripData.price);
    });

    test('given: missing description, when: trip is validated, then: an error is thrown', () => {
        // Given
        const trip = new Trip({ ...validTripData, description: '' } as any);

        // Then
        expect(() => trip.validate()).toThrow('Description is required.');
    });

    test('given: missing destination, when: trip is validated, then: an error is thrown', () => {
        // Given
        const trip = new Trip({ ...validTripData, destination: '' } as any);

        // Then
        expect(() => trip.validate()).toThrow('Destination is required.');
    });

    test('given: missing start date, when: trip is validated, then: an error is thrown', () => {
        // Given
        const trip = new Trip({ ...validTripData, startDate: undefined } as any);

        // Then
        expect(() => trip.validate()).toThrow('Start date is required.');
    });

    test('given: missing end date, when: trip is validated, then: an error is thrown', () => {
        // Given
        const trip = new Trip({ ...validTripData, endDate: undefined } as any);

        // Then
        expect(() => trip.validate()).toThrow('End date is required.');
    });

    test('given: negative price, when: trip is validated, then: an error is thrown', () => {
        // Given
        const trip = new Trip({ ...validTripData, price: -100 } as any);

        // Then
        expect(() => trip.validate()).toThrow('Price must be a positive number.');
    });
});
