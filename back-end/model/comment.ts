import { User } from "./user";
import { 
    Comment as CommentPrisma,
    User as UserPrisma,
} from '@prisma/client'

export class Comment{
    private readonly id?: number;
    private readonly createdAt: Date;
    private readonly author: User;
    private body: string;
    private reviewId: number;

    constructor(comment: {
        id: number
        author: User
        body: string
        reviewId: number 
        createdAt: Date
    }){
        this.id = comment.id;
        this.author = comment.author;
        this.reviewId = comment.reviewId;
        this.body = comment.body;
        this.createdAt = comment.createdAt;
    }

    static from({  
        id,
        createdAt,
        body,
        author,
        reviewId,
    }:CommentPrisma & {
        author: UserPrisma
    }){
        return new Comment({
            id: id, 
            createdAt: createdAt,
            body: body,
            author: User.from(author),
            reviewId: reviewId
        });
    }

    getId(): number | undefined {
        return this.id;
    }

    getBody(): string{
        return this.body;
    }

    getReview(): number{
        return this.reviewId;
    }

    getCreatedAt(): Date{
        return this.createdAt;
    }

    getUser(): User{
        return this.author;
    }
}
