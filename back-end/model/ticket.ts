import { Order } from './order'; 

export class Ticket {
    private id?: number;
    private date: string;
    private price: number;
    private startStation: string;
    private desStation: string;
    private orderId: number;

    constructor(ticket: {
        id?: number;
        date: string;
        price: number;
        startStation: string;
        desStation: string;
        order: Order;
    }) {
        this.validate(ticket);

        this.id = ticket.id;
        this.date = ticket.date;
        this.price = ticket.price;
        this.startStation = ticket.startStation;
        this.desStation = ticket.desStation;
        this.orderId = ticket.order.getOrderId()!;
    }

    getId(): number | undefined {
        return this.id;
    }

    getDate(): string {
        return this.date;
    }

    getPrice(): number {
        return this.price;
    }

    getStartStation(): string {
        return this.startStation;
    }

    getDesStation(): string {
        return this.desStation;
    }

    getOrderId(): number {
        return this.orderId;
    }

    validate(ticket: {
        id?: number;
        date: string;
        price: number;
        startStation: string;
        desStation: string;
        order: Order;
    }) {
        if (ticket.id !== undefined && ticket.id <= 0) {
            throw new Error('ID must be a positive number if provided');
        }
        if (!ticket.date?.trim()) {
            throw new Error('Date is required');
        }
        if (ticket.price <= 0) {
            throw new Error('Price must be a positive number');
        }
        if (!ticket.startStation?.trim()) {
            throw new Error('StartStation is required');
        }
        if (!ticket.desStation?.trim()) {
            throw new Error('Destination Station is required');
        }
        if (!ticket.order.getOrderId()) {
            throw new Error('Order ID is required');
        }
    }

    equals(ticket: Ticket): boolean {
        return (
            this.id === ticket.getId() &&
            this.date === ticket.getDate() &&
            this.price === ticket.getPrice() &&
            this.startStation === ticket.getStartStation() &&
            this.desStation === ticket.getDesStation() &&
            this.orderId === ticket.getOrderId()
        );
    }
}
