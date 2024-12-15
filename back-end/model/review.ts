export class Review {
    private title: string;
    private rating: number;
    private description: string;
    private date: Date;

    constructor(review: {title: string; rating: number; description: string; date: Date;}) {
        this.title = review.title;
        this.rating = review.rating;
        this.description = review.description;
        this.date = review. date;
    }

    getTitle(): string {
        return this.title;
    }

    getRating(): number {
        return this.rating;
    }

    getDescription(): string {
        return this.description;
    }

    getDate(): Date {
        return this.date;
    }

    validate(review: {
        title: string; 
        rating: number; 
        description: string; 
        date: Date;
    }) {
        if (!review.title?.trim()) {
            throw new Error('Title is required');
        }
        if  (review.rating == null || isNaN(review.rating)) {
            throw new Error('Rating is required');
        }
        if (!review.description?.trim()) {
            throw new Error('Description is required');
        }
        if (!review.date || isNaN(review.date.getTime()))  {
            throw new Error('Date is required');
    }
    }
    equals(review: Review): boolean {
        return (
           this.title === review.getTitle() &&
           this.rating == review.getRating() &&
           this.description === review.getDescription() &&
           this.date === review.getDate() 
        );
    }
}

export default {Review};