import { OrderInput } from "../types";

export class Order {
    private cartId!: number;
    private date!: Date;

    constructor(order: { cartId: number, date: Date }) {
        this.setCartId(order.cartId);
        this.setDate(order.date);
    }

    public getCartId(): number | undefined {
        return this.cartId
    }
    setCartId(cartId: number) {
        this.cartId = cartId;
    }

    public getDate(): Date {
        return this.date
    }
    setDate(date: Date) {
        this.date = date;
    }

    equals(newOrder: Order) {
        return (
            newOrder.cartId === this.cartId &&
            newOrder.date === this.date
        )
    }
}