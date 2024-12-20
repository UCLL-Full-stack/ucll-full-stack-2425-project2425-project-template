import { Cart } from "./cart";
import { Product } from "./product";
import { User } from "./user";
import { Order as OrderPrisma, Product as ProductPrisma, User as UserPrisma, OrderProduct as OrderProductPrisma } from '@prisma/client';

export class Order {
    readonly id?: number;
    readonly totalPrice: number;
    readonly orderDate: Date;
    readonly products: Product[];
    readonly user: User;

    constructor(order: {
        id?: number;
        totalPrice: number;
        orderDate: Date;
        products: Product[];
        user: User;
    }) {
        this.validate(order);
        this.id = order.id;
        this.totalPrice = order.totalPrice;
        this.orderDate = order.orderDate;
        this.products = order.products;
        this.user = order.user;
    }

    static from({
        id,
        totalPrice,
        orderDate,
        products,
        user,
    }: OrderPrisma & { products: (OrderProductPrisma & { product: ProductPrisma })[]; user: UserPrisma }): Order {
        return new Order({
            id,
            totalPrice,
            orderDate,
            products: products.map(orderProduct => Product.from(orderProduct.product)),
            user: User.from(user),
        });
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

    getProducts(): Product[] {
        return this.products;
    }

    getUser(): User {
        return this.user;
    }

    validate(order: {
        totalPrice: number;
        orderDate: Date;
        products: Product[];
        user: User;
    }) {
        if (!order.totalPrice || order.totalPrice <= 0) {
            throw new Error('Total price must be greater than zero');
        }
        if (!(order.orderDate instanceof Date) || isNaN(order.orderDate.getTime())) {
            throw new Error('Valid order date is required');
        }
        if (!order.products || order.products.length === 0) {
            throw new Error('Products are required');
        }
        if (!order.user) {
            throw new Error('User is required');
        }
    }

    equals(order: Order): boolean {
        return (
            this.totalPrice === order.getTotalPrice() &&
            this.orderDate.getTime() === order.getOrderDate().getTime() &&
            this.products.length === order.getProducts().length &&
            this.products.every((product, index) => product.equals(order.getProducts()[index])) &&
            this.user.equals(order.getUser())
        );
    }
}