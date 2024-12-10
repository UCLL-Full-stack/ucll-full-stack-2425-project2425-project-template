import { CartItem } from './cartItem';
import { Product } from './product';
import {
    User as UserPrisma,
    CartItem as CartItemPrisma,
    Shoppingcart as ShoppingcartPrisma,
} from '@prisma/client';

export class Shoppingcart {
    private id?: number;
    private cartItems: CartItem[];
    private totalPrice: number;

    constructor(shoppingcart: { id?: number; cartItems: CartItem[]; totalPrice: number }) {
        this.id = shoppingcart.id;
        this.cartItems = shoppingcart.cartItems;
        this.totalPrice = this.calculateTotalPrice();
    }

    public addProductToCart(product: Product, quantity: number): void {
        const existingCartItem = this.cartItems.find((item) => item.getProduct().equals(product));

        if (existingCartItem) {
            existingCartItem.setQuantity(existingCartItem.getQuantity() + quantity);
        } else {
            this.cartItems.push(new CartItem({ product, quantity }));
        }

        this.totalPrice = this.calculateTotalPrice();
    }

    public removeProductFromCart(product: Product): void {
        this.cartItems = this.cartItems.filter((item) => !item.getProduct().equals(product));
        this.totalPrice = this.calculateTotalPrice();
    }

    public calculateTotalPrice(): number {
        return this.cartItems.reduce((sum, item) => sum + item.getTotalPrice(), 0);
    }

    public getCartItems(): CartItem[] {
        return this.cartItems;
    }

    public getTotalPrice(): number {
        return this.totalPrice;
    }

    public getId(): number | undefined {
        return this.id;
    }

    equals(shoppingcart: Shoppingcart): boolean {
        return (
            this.id === shoppingcart.getId() &&
            this.cartItems === shoppingcart.getCartItems() &&
            this.totalPrice === shoppingcart.getTotalPrice()
        );
    }
    static from({
        id,
        cartItems,
        totalPrice,
    }: ShoppingcartPrisma & { cartItems: CartItemPrisma[] }) {
        return new Shoppingcart({
            id,
            cartItems: cartItems.map((item) => CartItem.from(item)),
            totalPrice,
        });
    }
}
