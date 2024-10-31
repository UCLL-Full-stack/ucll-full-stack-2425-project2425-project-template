export class Review {
    private id? : number;
    private score : number;
    private comment: string;
    private date: Date;

    constructor(review:{id?: number, score: number, comment: string, date: Date}) {
        this.id = review.id;
        this.score = review.score;
        this.comment = review.comment;
        this.date = review.date;
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

    public getDate(): Date {
        return this.date;
    }

    equals(review: Review): boolean {
        return (
            this.id === review.getId() &&
            this.score === review.getScore() &&
            this.comment === review.getComment() &&
            this.date === review.getDate()
        )
    }
}