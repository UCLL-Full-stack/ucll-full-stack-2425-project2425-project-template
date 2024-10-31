import { Review } from "./review";

export class Product {
    private id?: number;
    private name: string;
    private price: number;
    private description: string;
    private stock: number;
    private reviews: Review[]

    constructor(product:{id?: number, name: string, price: number, description: string, stock: number, reviews: Review[]}) {
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.description = product.description;
        this.stock = product.stock;
        this.reviews = product.reviews;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public getPrice(): number {
        return this.price;
    }

    public getDescription(): string {
        return this.description;
    }

    public getStock(): number {
        return this.stock;
    }
    public getReviews(): Review[] {
        return this.reviews;
    }

    equals(product: Product): boolean {
        return (
            this.id === product.getId() &&
            this.name === product.getName() &&
            this.price === product.getPrice() &&
            this.description === product.getDescription() &&
            this.stock === product.getStock() &&
            this.reviews === product.getReviews()
        )
    }
    addReviewToProduct(review: Review) {
        this.reviews.push(review);
    }
}