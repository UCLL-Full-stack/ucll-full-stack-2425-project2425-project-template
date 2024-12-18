import { Product as ProductPrisma } from '@prisma/client';
export class Product {
    readonly id?: number;
    readonly name: string;
    readonly price: number;
    readonly description: string;
    readonly rating: number;
    readonly url?: string;

    constructor(product: {
        id?: number;
        name: string;
        price: number;
        description: string;
        rating: number;
        url?: string;
    }) {
        this.validate(product);

        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.description = product.description;
        this.rating = product.rating;
        this.url = product.url;
    }

    static from({
        id,
        name,
        price,
        description,
        rating,
        url,
    }: ProductPrisma) {
        return new Product({
            id,
            name,
            price,
            description,
            rating,
            url,
        });
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getPrice(): number {
        return this.price;
    }

    getDescription(): string {
        return this.description;
    }

    getRating(): number {
        return this.rating;
    }

    getUrl(): string | undefined{
        return this.url;
    }

    validate(product: {
        name: string;
        price: number;
        description: string;
        rating: number;
    }) {
        if (!product.name?.trim()) {
            throw new Error('name is required');
        }
        if (!product.price) {
            throw new Error('Price is required');
        }
        if (!product.description?.trim()) {
            throw new Error('Description is required');
        }
        if (!product.rating) {
            throw new Error('rating is required');
        }
    }

    equals(product: Product): boolean {
        return (
            this.name === product.getName() &&
            this.price === product.getPrice() &&
            this.description === product.getDescription() &&
            this.rating === product.getRating() &&
            this.url === product.getUrl()
        );
    }
}
