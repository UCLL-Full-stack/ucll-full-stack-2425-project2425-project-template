import { Participant } from "./participant";

export class Event {
    private id?: number;
    private name: string;
    private description: string;
    private date: Date;
    private location: string;
    private category: string;
    private backgroundImage?: string;
    private participants: Participant[] = [];

    constructor(event: {
        id?: number,
        name: string,
        description: string,
        date: Date,
        location: string,
        category: string;
        backgroundImage?: string;
        participants?: Participant[];
    }) {
        // Validate the date
        if (isNaN(event.date.getTime())) {
            throw new Error('Date is invalid');
        }

        if (!event.name) {
            throw new Error('Name cannot be empty');
        }
        if (!event.description) {
            throw new Error('Description cannot be empty');
        }
        if (!event.location) {
            throw new Error('Location cannot be empty');
        }
        if (!event.category) {
            throw new Error('Category cannot be empty');
        }

        this.id = event.id;
        this.name = event.name;
        this.description = event.description;
        this.date = event.date;
        this.location = event.location;
        this.category = event.category;
        this.backgroundImage = event.backgroundImage;
        if (event.participants) {
            this.participants = event.participants;
        }
    }

    addParticipant(participant: Participant): void {
        this.participants.push(participant);
    }

    getParticipants(): Participant[] {
        return this.participants;
    }

    getId(): number | undefined {
        if (this.id === undefined) {
            throw new Error('The event needs to have an ID.');
        }
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getDescription(): string {
        return this.description;
    }

    getDate(): Date {
        return this.date;
    }

    getLocation(): string {
        return this.location;
    }

    getCategory(): string {
        return this.category;
    }

    getBackgroundImage(): string | undefined {
        return this.backgroundImage;
    }



    equals(event: Event): boolean {
        return (
            this.name === event.getName() &&
            this.description === event.getDescription() &&
            this.date === event.getDate() &&
            this.location === event.getLocation() &&
            this.category === event.getCategory()
        );
    }
}