import { User } from './user'; // Assuming User class is in the same directory

export class Order {
    private id?: number;
    private orderDate: Date;
    private product: string;
    private price: number;
    private userId: number;

    constructor(order: {
        id?: number;
        orderDate: Date;
        product: string;
        price: number;
        user: User;
    }) {
        this.validate(order);

        this.id = order.id;
        this.orderDate = order.orderDate;
        this.product = order.product;
        this.price = order.price;
        this.userId = order.user.getId()!;
    }

    getOrderDate(): Date {
        return this.orderDate;
    }

    getProduct(): string {
        return this.product;
    }

    getPrice(): number {
        return this.price;
    }

    getOrderId(): number | undefined {
        return this.id;
    }

    getUserId(): number {
        return this.userId;
    }

    validate(order: {
        orderDate: Date;
        product: string;
        price: number;
        user: User;
    }) {
        if (!(order.orderDate instanceof Date)) {
            throw new Error('Order date must be a valid date');
        }
        if (!order.product?.trim()) {
            throw new Error('Product is required');
        }
        if (order.price <= 0) {
            throw new Error('Price must be a positive number');
        }
        if (!order.user.getId()) {
            throw new Error('User ID is required');
        }
    }

    equals(order: Order): boolean {
        return (
            this.product === order.getProduct() &&
            this.price === order.getPrice() &&
            this.userId === order.getUserId()
        );
    }
}
