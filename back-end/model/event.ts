export class Event {
    private id?: number;
    private name: string;
    private date: Date;
    private price: number;
    private minParticipants: number;
    private maxParticipants: number;
    private lastEdit: Date;
    private dateCreated: Date;
    //location to be added
    //category to be added

    constructor(event: {
        name: string;
        date: Date;
        price: number;
        minParticipants: number;
        maxParticipants: number;
    }) {
        this.validate(event);
        this.name = event.name;
        this.date = event.date;
        this.price = event.price;
        this.minParticipants = event.minParticipants;
        this.maxParticipants = event.maxParticipants;
        this.lastEdit = new Date();
        this.dateCreated = new Date();
    }

    validate(event: {
        name: string;
        date: Date;
        price: number;
        minParticipants: number;
        maxParticipants: number;
    }) {
        const currentDate = new Date();
        if (!event.name) throw new Error('Name is required.');
        if (event.date < currentDate) throw new Error('Date cannot be in the past.');
        if (event.price < 0) throw new Error('Price must be positive.');
        if (event.minParticipants < 0) throw new Error('Minimum participants must be positive.');
        if (!event.maxParticipants) throw new Error('Maximum participants is required.');
        if (event.maxParticipants < 0) throw new Error('Maximum participants must be positive.');
        if (event.maxParticipants < event.minParticipants)
            throw new Error('Minimum participants must be greater than minimum participants.');
        //dates (lastEdit and dateCreated) are changed/added when instance is made or editted
        //location to be added
        //category to be added
    }

    getName(): string {
        return this.name;
    }

    setName(name: string): void {
        this.name = name;
    }
    getDate(): Date {
        return this.date;
    }
    setDate(date: Date): void {
        this.date = date;
    }

    getPrice(): number {
        return this.price;
    }
    setPrice(price: number): void {
        this.price = price;
    }

    getMinParticipants(): number {
        return this.minParticipants;
    }

    setMinParticipants(min: number): void {
        this.minParticipants = min;
    }

    getMaxParticipants(): number {
        return this.maxParticipants;
    }

    setMaxParticipants(max: number): void {
        this.maxParticipants = max;
    }

    getLastEdit(): Date {
        return this.lastEdit;
    }

    setLastEdit(date: Date): void {
        this.lastEdit = date;
    }

    getDateCreated(): Date {
        return this.dateCreated;
    }
    setDateCreated(date: Date): void {
        this.dateCreated = date;
    }
}
