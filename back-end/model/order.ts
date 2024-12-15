import { Cart } from "./cart";
import { Product } from "./product";

export class Order {
    private id?: number;
    private totalPrice: number;
    private orderDate: Date;
    private cart: Cart;

    constructor(order: {
        id?: number;
        totalPrice: number;
        orderDate: Date;
        cart: Cart;
    }) {
        this.validate(order);

        this.id = order.id;
        this.totalPrice = order.totalPrice;
        this.orderDate = order.orderDate;
        this.cart = order.cart;
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

    getCart(): Cart {
        return this.cart;
    }

    validate(order: {
        totalPrice: number;
        orderDate: Date;
        cart: Cart;
    }) {
        if (!order.totalPrice || order.totalPrice <= 0) {
            throw new Error('Total price must be greater than zero');
        }
        if (!(order.orderDate instanceof Date) || isNaN(order.orderDate.getTime())) {
            throw new Error('Valid order date is required');
        }
        if (!order.cart) {
            throw new Error('Cart is required');
        }
    }

    equals(order: Order): boolean {
        return (
            this.totalPrice === order.getTotalPrice() &&
            this.orderDate.getTime() === order.getOrderDate().getTime() &&
            this.cart === order.getCart()
        );
    }
}