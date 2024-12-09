
export class Review {
    private id?: number;
    private rating: number;
    private text: string;
    private createdAt: Date;

    constructor(review: {
        id?: number;
        rating: number;
        text: string;
        createdAt: Date;
    }) {
        this.validate(review);

        this.id = review.id;
        this.rating = review.rating;
        this.text = review.text;
        this.createdAt = review.createdAt;
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

    getCreatedAt(): Date {
        return this.createdAt;
    }

    validate(review: {
        rating: number;
        text: string;
        createdAt: Date;
    }) {
        if (!review.rating || review.rating < 1 || review.rating > 5) {
            throw new Error('Rating must be between 1 and 5');
        }
        if (!review.text?.trim()) {
            throw new Error('Text is required');
        }
        if (!(review.createdAt instanceof Date) || isNaN(review.createdAt.getTime())) {
            throw new Error('Valid creation date is required');
        }
    }

    equals(review: Review): boolean {
        return (
            this.rating === review.getRating() &&
            this.text === review.getText() &&
            this.createdAt.getTime() === review.getCreatedAt().getTime()
        );
    }
}