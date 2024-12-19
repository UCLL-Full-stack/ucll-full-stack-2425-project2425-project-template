import { Trip } from '../../model/trip';

const validTripData = {
    description: 'Mountain Adventure',
    destination: 'Himalayas',
    startDate: new Date('2023-10-01'),
    endDate: new Date('2023-10-15'),
    price: 2500,
};

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

test('given: two identical trips, when: checking equality, then: trips are equal', () => {
    // Given
    const trip1 = new Trip(validTripData);
    const trip2 = new Trip(validTripData);

    // Then
    expect(trip1.equals(trip2)).toBe(true);
});

test('given: two different trips, when: checking equality, then: trips are not equal', () => {
    // Given
    const trip1 = new Trip(validTripData);
    const trip2 = new Trip({ ...validTripData, destination: 'Alps' });

    // Then
    expect(trip1.equals(trip2)).toBe(false);
});