import { Product } from "./product";

export class Cart {
    private id?: number;
    private totalPrice: number;
    private products: Product[];

    constructor(cart: {
        id?: number;
        products: Product[];
    }) {
        this.validate(cart);

        this.id = cart.id;
        this.products = cart.products;
        this.totalPrice = this.calculateTotalPrice();
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

    validate(cart: {
        products: Product[];
    }) {
        this.products = cart.products || [];
    }

    equals(cart: Cart): boolean {
        return (
            this.products.every((product,index) => product.equals(cart.getProducts()[index])) &&
            this.totalPrice === cart.getTotalPrice()
        );
    }
}
