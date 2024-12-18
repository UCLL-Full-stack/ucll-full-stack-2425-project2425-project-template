import { Product } from "./product";
import { User } from "./user";
import { Cart as CartPrisma, Product as ProductPrisma, User as UserPrisma } from '@prisma/client';

export class Cart {
    readonly id?: number;
    readonly totalPrice: number;
    readonly products: Product[];
    readonly user: User;

    constructor(cart: {
        id?: number;
        products: Product[];
        user: User;
    }) {
        this.validate(cart);

        this.id = cart.id;
        this.products = cart.products;
        this.totalPrice = this.calculateTotalPrice();
        this.user = cart.user;
    }

    static from({
        id,
        products,
        user,
    }: CartPrisma & { products: ProductPrisma[]; user: UserPrisma }): Cart {
        return new Cart({
            id,
            products: products.map(product => Product.from(product)),
            user: User.from(user),
        });
    }

    private calculateTotalPrice(): number {
        return this.products.reduce((total, product) => total + product.getPrice(), 0);
    }

    getId(): number | undefined {
        return this.id;
    }

    getProducts(): Product[] {
        return this.products;
    }

    getTotalPrice(): number {
        return this.totalPrice;
    }

    getUser(): User {
        return this.user;
    }

    validate(cart: {
        products: Product[];
        user: User;
    }) {
        if (!cart.user) {
            throw new Error('User is required');
        }
    }

    equals(cart: Cart): boolean {
        return (
            this.products.every((product,index) => product.equals(cart.getProducts()[index])) &&
            this.totalPrice === cart.getTotalPrice() &&
            this.user === cart.getUser()
        );
    }
}
