import { Product } from "./product";

export class Shoppingcart {
    private id?: number;
    private products: Product[];
    private totalPrice: number;

    constructor(shoppingcart:{id?: number, products: Product[], totalPrice: number}) {
        this.id = shoppingcart.id;
        this.products = shoppingcart.products;
        this.totalPrice = shoppingcart.totalPrice;
    }

    addProductToShoppingCart(product: Product) {
        this.products.push(product);
        this.totalPrice += product.getPrice();
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getProducts(): Product[] {
        return this.products;
    }

    public getTotalPrice(): number {
        return this.totalPrice;
    }
}