export class Review {
    private id? : number;
    private score : number;
    private comment: string;

    constructor(review:{id?: number, score: number, comment: string}) {
        this.id = review.id;
        this.score = review.score;
        this.comment = review.comment;
    }

    public getId(): number | undefined {
        return this.id;
    }

    public getScore(): number {
        return this.score;
    }

    public getComment(): string {
        return this.comment;
    }

    equals(review: Review): boolean {
        return (
            this.id === review.getId() &&
            this.score === review.getScore() &&
            this.comment === review.getComment()
        )
    }
}