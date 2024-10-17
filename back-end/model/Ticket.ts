
export class Ticket {
    private id?: number;
    private price: number;
    private date: Date;
    private time: Date;
    private chair: number;

    constructor(ticket: {
        id?: number;
        price: number;
        date: Date;
        time: Date;
        chair: number;
    }) {
        this.id = ticket.id;
        this.price = ticket.price;
        this.date = ticket.date;
        this.time = ticket.time;
        this.chair = ticket.chair;
    }

    getId(): number | undefined {
        return this.id;
    }

    getPrice(): number{
        return this.price;
    }

    getDate(): Date {
        return this.date;
    }

    getTime(): Date {
        return this.time;
    }

    getChair(): number {
        return this.chair;
    }

}
