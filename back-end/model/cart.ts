import { Product } from "./product";
import { User } from "./user";

export class Cart {
    private id?: number;
    private totalPrice: number;
    private products: Product[];
    private user: User;

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
        this.products = cart.products || [];
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
