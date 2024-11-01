import { Trip } from "../domain/model/trip";

export class tripRepository {
    private trips: Trip[] = [];

    async getAllTrips(): Promise<Trip[]> {
        return this.trips;
    }

    async addTrip(trip: Trip): Promise<Trip> {
        this.trips.push(trip);
        return trip;
    }

    async getTripById(id: number): Promise<Trip | undefined> {
        return this.trips.find(trip => trip.getId() === id);
    }

    async deleteTripById(id: number): Promise<void> {
        this.trips = this.trips.filter(trip => trip.getId() !== id);
    }
}