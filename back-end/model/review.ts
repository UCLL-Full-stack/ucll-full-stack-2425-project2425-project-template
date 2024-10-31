import { Album } from "./album";
import { User } from "./user";

export class Review{
    private readonly id?: number;
    private readonly album: Album;
    private readonly user: User;
    private readonly createdAt: number;
    private title: string;
    private body: string;
    private likeCount: number;
    private starRating: number;

    constructor(review: {
        album: Album,
        user: User,
        title: string,
        body: string,
        starRating: number
    }){
        this.validate(review);

        this.album = review.album;
        this.user = review.user;
        this.title = review.title;
        this.body = review.body;
        this.likeCount = 0;
        this.starRating = review.starRating;
        this.createdAt = Date.now();
    }

    getId(): number | undefined{
        return this.id;
    }

    getTitle(): string{
        return this.title;
    }

    getBody(): string{
        return this.body;
    }

    getLikeCount(): number{
        return this.likeCount;
    }

    getStarRating(): number{
        return this.starRating;
    }

    getAlbum(): Album {
        return this.album;
    }

    getCreatedAt(): number{
        return this.createdAt;
    }

    setTitle(title: string){
        this.title = title;
    }

    setBody(body: string){
        this.body = body;
    }

    like(){
        this.likeCount++;
    }

    setStarRating(starRating: number){
        this.checkStarRating(starRating);
        this.starRating = starRating;
    }

    private checkStarRating(starRating: number){
        if(starRating<0 || starRating > 5){
            throw new Error('star rating should be between 0 and 5');    
        }
    }

    validate(review: {
        starRating: number,
    }){
        this.checkStarRating(review.starRating);
    }

    equals(review: {
        album: Album,
        user: User,
        title: string,
        body: string,
        likeCount: number,
        starRating: number
    }): boolean{
        return (
            this.title == review.title &&
            this.body == review.body &&
            this.likeCount == review.likeCount &&
            this.starRating == review.starRating &&
            this.album == review.album &&
            this.user == review.user
        )
    }
};
