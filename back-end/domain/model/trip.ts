export class Trip {
    private id?: number;
    private description: string;
    private location: string;
    private startDate: Date;
    private endDate: Date;
    private price: number;

    constructor(trip: { id?: number; description: string; location: string; startDate: Date; endDate: Date; price: number }) {
        this.id = trip.id;
        this.description = trip.description;
        this.location = trip.location;
        this.startDate = trip.startDate;
        this.endDate = trip.endDate;
        this.price = trip.price;
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
    equals(trip: Trip): boolean {
        return (
            this.id === trip.getId() &&
            this.description === trip.getDescription() &&
            this.location === trip.getLocation() &&
            this.startDate === trip.getStartDate() &&
            this.endDate === trip.getEndDate()
        );
    }
}
