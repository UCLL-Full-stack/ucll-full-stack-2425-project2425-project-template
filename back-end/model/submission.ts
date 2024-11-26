import { Submission as SubmissionPrisma, User } from "@prisma/client";

export class Submission {
    public id?: number;
    private title: string;
    private content: string;
    private type: string;
    private createdAt: Date;
    private solvedAt?: Date;
    private createdBy: User;

    constructor(submission: { title: string, content: string, type: string, createdAt: Date, createdBy: User, solvedAt?: Date, id?: number }) {
        this.validate(submission);

        this.title = submission.title;
        this.content = submission.content;
        this.type = submission.type;
        this.createdAt = submission.createdAt;
        this.createdBy = submission.createdBy;
        if (submission.solvedAt) this.solvedAt = submission.solvedAt;
        if (submission.id) this.id = submission.id;
    }

    private validate(submission: { title: string, content: string, type: string, createdAt: Date, createdBy: User, id?: number }): void {
        if (!submission.title) {
            throw new Error('Title is required');
        }
        if (!submission.content) {
            throw new Error('Content is required');
        }
        if (!submission.type) {
            throw new Error('Type is required');
        }
        if (!submission.createdAt) {
            throw new Error('createdAt is required');
        }
        if (!submission.createdBy) {
            throw new Error('createdBy is required');
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getTitle(): string {
        return this.title;
    }

    getContent(): string {
        return this.content;
    }

    getType(): string {
        return this.type;
    }

    getCreatedAt(): Date {
        return this.createdAt;
    }

    getSolvedAt(): Date | undefined {
        return this.solvedAt;
    }

    getCreatedBy(): User {
        return this.createdBy;
    }

    equals(other: Submission): boolean {
        return (
            this.id === other.id &&
            this.title === other.title &&
            this.content === other.content &&
            this.type === other.type &&
            this.createdAt === other.createdAt &&
            this.solvedAt === other.solvedAt &&
            this.createdBy === other.createdBy
        );
    }

    static from ({
        id,
        title,
        content,
        type,
        createdAt,
        solvedAt,
        createdBy
    }: SubmissionPrisma & {
        createdBy: User
        solvedAt?: Date
    }) {
        return new Submission({
            id,
            title,
            content,
            type,
            createdAt,
            solvedAt,
            createdBy
        });
    }
}