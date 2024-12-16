
export class Product {
    private id?: number;
    private name: string;
    private price: number;
    private description: string;
    private rating: number;

    constructor(product: {
        id?: number;
        name: string;
        price: number;
        description: string;
        rating: number;
    }) {
        this.validate(product);

        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.description = product.description;
        this.rating = product.rating;
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
            this.rating === product.getRating()
        );
    }
}
