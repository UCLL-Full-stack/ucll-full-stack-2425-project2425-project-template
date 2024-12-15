import { 
    Review as ReviewPrisma,
    Comment as CommentPrisma,
    User as UserPrisma,
} from '@prisma/client';
import { Comment } from './comment';
import { User } from './user';

export class Review{
    private readonly id?: number;
    private readonly createdAt: Date;
    private readonly author: User;
    private title: string;
    private body: string;
    private starRating: number; 
    private albumId: string;
    private likeCount: number; 
    private comments: Comment[];

    constructor(review: {
        id?: number,
        author: User,
        title: string, 
        body: string,
        starRating: number,
        albumId: string,
        createdAt: Date,
        likeCount: number,
        comments?: Comment[]
    }){
        this.validate(review);
        this.id = review.id;
        this.author = review.author;
        this.title = review.title;
        this.body= review.body;
        this.albumId = review.albumId;
        this.starRating = review.starRating;
        this.createdAt = review.createdAt;
        this.likeCount = review.likeCount;
        this.comments = review.comments??[]
    }

    static from({
        id,
        author,
        createdAt,
        title,
        body,
        starRating,
        albumID,
        likeCount,
        comments
    }: ReviewPrisma & {
            comments?: (CommentPrisma & {author: UserPrisma})[];
            author: UserPrisma
    }){
        return new Review({
            id: id,
            author: User.from(author),
            title: title,
            body: body,
            albumId: albumID,
            starRating: starRating,
            likeCount: likeCount,
            createdAt: createdAt,
            comments: comments?.map(comment=>Comment.from(comment))??[]
        });
    }

    validate(review: {
        title: string,
        body: string,
        starRating: number,
        albumId: string
    }){
        if(!review.title || !review.body)
            throw new Error('title and body cannot be empty');

        if(!review.albumId)
            throw new Error('review need an albumId');

        if(review.starRating < 0 || review.starRating > 5)
            throw new Error('starRating should be between 0 and 5 inclusively');
    }

    getId(): number | undefined{
        return this.id;
    }

    getUser(): User{
        return this.author;
    }

    getTitle(): string{
        return this.title;
    }

    getDescription(): string{
        return this.body;
    }

    getStarRating(): number{
        return this.starRating
    }

    getComments(): Comment[]{
        return this.comments;
    }
    
    setStarRating(starRating: number) {
        if(starRating < 0 || starRating > 5)
            throw new Error('starRating should be between 0 and 5 inclusively');
        this.starRating = starRating;
    }

    getAlbum(): string{
        return this.albumId;
    }

    getCreatedAt(): Date{
        return this.createdAt;
    }

    getLikeCount(): Number{
        return this.likeCount;
    }

    like(){
        this.likeCount++;
    }

    equals(review: Review){
        return (
            this.title === review.title &&
            this.body === review.body &&
            this.starRating === review.starRating &&
            this.albumId === review.albumId &&
            this.likeCount === review.likeCount
        )
    }
};
