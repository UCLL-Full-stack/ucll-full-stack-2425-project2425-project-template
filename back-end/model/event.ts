export class Event {
    private id?: number;
    private name: string;
    private description: string;
    private date: Date;
    private location: string;
    private category: string;
    private backgroundImage?: string;

    constructor(event: {
        id?: number,
        name: string,
        description: string,
        date: Date,
        location: string,
        category: string,
        backgroundImage?: string,
    }) {
        this.id = event.id;
        this.name = event.name;
        this.description = event.description;
        this.date = event.date;
        this.location = event.location;
        this.category = event.category;
        this.backgroundImage = event.backgroundImage;
    }

    getId(): number | undefined {
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