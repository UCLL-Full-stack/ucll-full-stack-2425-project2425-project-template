import { Product } from "./product";

export class CartItem {
    private product: Product;
    private quantity: number;

    constructor(cartItem: { product: Product; quantity: number }) {
        this.validate(cartItem);
        this.product = cartItem.product;
        this.quantity = cartItem.quantity;
    }

    public getProduct(): Product {
        return this.product;
    }

    public getQuantity(): number {
        return this.quantity;
    }

    public setQuantity(quantity: number): void {
        if (quantity <= 0) {
            throw new Error('Quantity must be greater than 0');
        }
        this.quantity = quantity;
    }

    public getTotalPrice(): number {
        return this.product.getPrice() * this.quantity;
    }

    private validate(cartItem: { product: Product; quantity: number }) {
        if (!cartItem.product) {
            throw new Error('Product is required');
        }
        if (cartItem.quantity <= 0) {
            throw new Error('Quantity must be greater than 0');
        }
    }
}
