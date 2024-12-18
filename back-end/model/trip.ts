import { Booking } from "./booking";
import { Trip as TripPrisma } from '@prisma/client';

export class Trip {
  private id?: number;
  private description: string;
  private destination: string;
  private startDate: Date;
  private endDate: Date;
  private price: number;
  private bookings: Booking[] = [];
  
  constructor({
    id,
    description,
    destination,
    startDate,
    endDate,
    price,
  }: {
    id?: number;
    description: string;
    destination: string;
    startDate: Date;
    endDate: Date;
    price: number;
  }) {
    this.id = id;
    this.description = description;
    this.destination = destination;
    this.startDate = startDate;
    this.endDate = endDate;
    this.price = price;
    this.validate();
  }

  validate() {
    if (!this.description || this.description.trim().length === 0) {
      throw new Error('Description is required.');
    }
    if (!this.destination || this.destination.trim().length === 0) {
      throw new Error('Destination is required.');
    }
    if (!this.startDate) {
      throw new Error('Start date is required.');
    }
    if (!this.endDate) {
      throw new Error('End date is required.');
    }
    if (this.startDate >= this.endDate) {
      throw new Error('Start date must be before the end date.');
    }
    if (this.price < 0) {
      throw new Error('Price must be a positive number.');
    }
  }

  addBookingToTrip(booking: Booking) {
    if (!this.bookings.includes(booking)) {
      this.bookings.push(booking);
    }
  }

  getId(): number | undefined {
      return this.id;
  }

  getDestination(): string {
      return this.destination;
  }

  getStartDate(): Date {
      return this.startDate;
  }

  getEndDate(): Date {
      return this.endDate;
  }

  getPrice(): number {
      return this.price;
  }
  equals(trip: Trip): boolean {
    return (
      this.id === trip.id &&
      this.description === trip.description &&
      this.destination === trip.destination &&
      this.startDate.getTime() === trip.startDate.getTime() &&
      this.endDate.getTime() === trip.endDate.getTime() &&
      this.price === trip.price
    );
  }

  static from({
    id,
    description,
    destination,
    startDate,
    endDate,
    price,
  }: TripPrisma): Trip {
    return new Trip({
      id: id ? Number(id) : undefined,
      description,
      destination,
      startDate,
      endDate,
      price,
    });
  }
}
