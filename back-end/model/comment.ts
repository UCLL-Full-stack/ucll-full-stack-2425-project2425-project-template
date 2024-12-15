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
    private likeCount: number;

    constructor(comment: {
        id: number
        author: User
        body: string
        reviewId: number 
        createdAt: Date
        likeCount: number
    }){
        this.id = comment.id;
        this.author = comment.author;
        this.reviewId = comment.reviewId;
        this.body = comment.body;
        this.createdAt = comment.createdAt;
        this.likeCount = comment.likeCount;
    }

    static from({  
        id,
        createdAt,
        body,
        author,
        likeCount,
        reviewId,
    }:CommentPrisma & {
        author: UserPrisma
    }){
        return new Comment({
            id: id, 
            createdAt: createdAt,
            body: body,
            author: User.from(author),
            reviewId: reviewId,
            likeCount: likeCount
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

    getLikeCount(): number{
        return this.likeCount; 
    }
    
    getCreatedAt(): Date{
        return this.createdAt;
    }

    getUser(): User{
        return this.author;
    }

    like(){
        this.likeCount++;
    }
}
