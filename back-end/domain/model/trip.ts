import { Booking } from "./booking";
import { Review } from "./review";
import { Student } from "./student";

export class Trip {
    private id?: number; 
    private description: string;
    private location: string;
    private startDate: Date;
    private endDate: Date;
    private price: number;
    private bookings: Booking[] = [];
    private favouritedBy: Student[] = [];
    private reviews: Review[] = [];

    constructor(trip: { id?: number; description: string; location: string; startDate: Date; endDate: Date; price: number }) {
        this.id = trip.id;
        this.description = trip.description;
        this.location = trip.location;
        this.startDate = trip.startDate;
        this.endDate = trip.endDate;
        this.price = trip.price;

        // Validation checks
        this.validateDescription();
        this.validateLocation();
        this.validateDates();
        this.validatePrice();
    }

    private validateDescription() {
        if (!this.description || this.description.trim().length === 0) {
            throw new Error("Description cannot be empty.");
        }
    }

    private validateLocation() {
        if (!this.location || this.location.trim().length === 0) {
            throw new Error("Location cannot be empty.");
        }
    }

    private validateDates() {
        if (this.startDate >= this.endDate) {
            throw new Error("Start date must be earlier than end date.");
        }
    }

    private validatePrice() {
        if (this.price <= 0) {
            throw new Error("Price must be a positive number.");
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getDescription(): string {
        return this.description;
    }

    getLocation(): string {
        return this.location;
    }

    getPrice(): number {
        return this.price;
    }

    getStartDate(): Date {
        return this.startDate;
    }

    getEndDate(): Date { 
        return this.endDate;
    }

    addBooking(booking: Booking): void {
        this.bookings.push(booking);
    }

    addFavourite(student: Student): void {
        if (this.favouritedBy.some(existingStudent => existingStudent.equals(student))) {
            throw new Error('Student has already favourited this trip');
        }
        this.favouritedBy.push(student);
    }

    addReview(review: Review): void {
        this.reviews.push(review);
    }

    equals(trip: Trip): boolean {
        return (
            this.id === trip.getId() &&
            this.description === trip.getDescription() &&
            this.location === trip.getLocation() &&
            this.startDate.getTime() === trip.getStartDate().getTime() &&
            this.endDate.getTime() === trip.getEndDate().getTime() &&
            this.price === trip.getPrice()
        );
    }
}
