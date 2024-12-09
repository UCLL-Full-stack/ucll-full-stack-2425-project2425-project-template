import { Product } from "./product";

export class Order {
    private id?: number;
    private totalPrice: number;
    private orderDate: Date;

    constructor(order: {
        id?: number;
        totalPrice: number;
        orderDate: Date;
    }) {
        this.validate(order);

        this.id = order.id;
        this.totalPrice = order.totalPrice;
        this.orderDate = order.orderDate;
    }

    getId(): number | undefined {
        return this.id;
    }

    getTotalPrice(): number {
        return this.totalPrice;
    }

    getOrderDate(): Date {
        return this.orderDate;
    }

    validate(order: {
        totalPrice: number;
        orderDate: Date;
    }) {
        if (!order.totalPrice || order.totalPrice <= 0) {
            throw new Error('Total price must be greater than zero');
        }
        if (!(order.orderDate instanceof Date) || isNaN(order.orderDate.getTime())) {
            throw new Error('Valid order date is required');
        }
    }

    equals(order: Order): boolean {
        return (
            this.totalPrice === order.getTotalPrice() &&
            this.orderDate.getTime() === order.getOrderDate().getTime()
        );
    }
}