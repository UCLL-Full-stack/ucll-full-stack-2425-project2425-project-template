import { User } from "./user";
import { Product } from "./product";
import { Review as ReviewPrisma } from '@prisma/client';

export class Review {
    readonly id?: number;
    readonly rating: number;
    readonly text: string;
    readonly createdAt?: Date;
    readonly user: User;
    readonly product: Product;

    constructor(review: {
        id?: number;
        rating: number;
        text: string;
        createdAt?: Date;
        user: User;
        product: Product;
    }) {
        this.validate(review);

        this.id = review.id;
        this.rating = review.rating;
        this.text = review.text;
        this.createdAt = review.createdAt;
        this.user = review.user;
        this.product = review.product;
    }

    getId(): number | undefined {
        return this.id;
    }

    getRating(): number {
        return this.rating;
    }

    getText(): string {
        return this.text;
    }

    getCreatedAt(): Date | undefined {
        return this.createdAt;
    }

    getUser(): User {
        return this.user;
    }

    getProduct(): Product {
        return this.product;
    }

    validate(review: {
        rating: number;
        text: string;
        user: User;
        product: Product;
    }) {
        if (!review.rating || review.rating < 1 || review.rating > 5) {
            throw new Error('Rating must be between 1 and 5');
        }
        if (!review.text?.trim()) {
            throw new Error('Text is required');
        }
        // if (!(review.createdAt instanceof Date) || isNaN(review.createdAt.getTime())) {
        //     throw new Error('Valid creation date is required');
        // }
        if (!review.user) {
            throw new Error('User is required');
        }
        if (!review.product) {
            throw new Error('Product is required');
        }
    }

    equals(review: Review): boolean {
        return (
            this.rating === review.getRating() &&
            this.text === review.getText() &&
            this.createdAt === review.getCreatedAt() &&
            this.user === review.getUser() &&
            this.product.equals(review.getProduct())
        );
    }

    static from({ id,rating,text,createdAt,user,product }: ReviewPrisma) {
        return new Review({
            id,
            rating,
            text,
            createdAt,
            user,
            product,
        });
    }
}