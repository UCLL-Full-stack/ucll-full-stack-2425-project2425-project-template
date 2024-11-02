import { Build } from "./build";

export class Order {
    private id?: number;
    private builds: Build[];
    private price: number;
    private orderStatus: string;
    private orderDate: Date;

    constructor(order: {
        id?: number;
        builds: Build[];
        price: number;
        orderStatus: string;
        orderDate: Date;
    }) {
        this.validate(order)

        this.id = order.id;
        this.builds = order.builds;
        this.price = order.price;
        this.orderStatus = order.orderStatus;
        this.orderDate = order.orderDate;
    }

    validate(order: {
        builds: Build[];
        price: number;
        orderStatus: string;
        orderDate: Date ;
    }) {
        if (!order.orderStatus) {throw new Error('OrderStatus cannot be empty');}

        if (order.builds.length == 0) {
            throw new Error('Order must have at least 1 build')
        }
        if (order.price <= 0) {
            throw new Error('Order must have positive and non zero price')
        }
        if (new Date(order.orderDate) > new Date()) {
            throw new Error('Order date cannot be in the future');
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getBuilds(): Build[] {
        return this.builds;
    }

    getPrice(): number {
        return this.price;
    }

    getOrderStatus(): string {
        return this.orderStatus;
    }

    getOrderDate(): Date {
        return this.orderDate;
    }
}