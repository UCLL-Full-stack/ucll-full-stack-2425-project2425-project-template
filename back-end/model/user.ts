import { Order } from "./order";


export class User {
    private id?: number;
    private name: string;
    private email: string;
    private password: string;
    private address: string;
    private orders: Order[] = [];

    constructor(user: {
        id?: number;
        name: string;
        email: string;
        password: string;
        address: string;
    }) {
        this.validate(user)

        this.id = user.id;
        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.address = user.address;
    }

    validate(user: {
        name: string;
        email: string;
        password: string;
        address: string;
    }) {
        if (!user.name) {throw new Error('Name cannot be empty');}
        if (!user.email) {throw new Error('Email cannot be empty');}
        if (!user.password) {throw new Error('Password cannot be empty');}
        if (!user.address) {throw new Error('Address cannot be empty');}

        if (!this.validateEmail(user.email)) {
            throw new Error('Invalid email format');
        }
        if (!user.password || user.password.length < 8) {
            throw new Error('Password must be at least 8 characters');
        }
    }

    private validateEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    public getOrderSummaries() {
        return this.orders.map(order => order.getSummary());
    }


    public addOrder(order: Order) {
        this.orders.push(order);
    }

    public toJson() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            address: this.address,
            orderSummaries: this.getOrderSummaries(),
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getEmail(): string {
        return this.email;
    }

    getName(): string {
        return this.name;
    }

    getPassword(): string {
        return this.password;
    }

    getAddress(): string {
        return this.address;
    }
}