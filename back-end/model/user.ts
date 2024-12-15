import { 
    List as ListPrisma, 
    Review as ReviewPrisma, 
    User as UserPrisma,
    Comment as CommentPrisma,
} from '@prisma/client';
import { List } from './list';
import { Review } from './review';

export class User{

    private readonly id: number;
    private readonly createdAt: number;
    private email: string;
    private username: string;
    private password: string;
    private lists?: List[];
    private reviews?: Review[];

    constructor(user: {
        id: number;
        createdAt: Date;
        email: string, 
        username: string, 
        password: string,
        lists?: List[],
        reviews?: Review[]
    }){
        this.validate(user);
        this.id = user.id;
        this.email = user.email;   
        this.username = user.username;
        this.password = user.password;
        this.createdAt = Date.now();
        this.lists = user.lists??[];
        this.reviews = user.reviews??[];
    }
    
    static from({
        id,
        createdAt,
        email,
        username,
        password,
        lists,
        reviews
    }: UserPrisma & {
        lists?: (ListPrisma & {
            author: UserPrisma
        })[],
        reviews?: (ReviewPrisma & {
            comments: (CommentPrisma & {
                author: UserPrisma
            })[],
            author: UserPrisma
        })[]
    }): User{
        return new User({
            id: id,
            createdAt: createdAt,
            email: email,
            username: username,
            password: password,
            lists: lists?.map((list)=>List.from(list))??[],
            reviews: reviews?.map((review)=>Review.from(review))??[]
        });
    }

    getId(): number {
        return this.id;
    }

    getEmail(): string{
        return this.email;
    }

    getUsername(): string{
        return this.username;
    }

    getPassword(): string{
        return this.password;
    }

    getLists(): List[]{
        return this.lists??[];
    }

    getReviews(): Review[]{
        return this.reviews??[];
    }

    getCreatedAt(): number{
        return this.createdAt;
    }

    setEmail(email: string){
        this.checkEmail(email);
        this.email = email;
    }

    setUsername(userName: string) {
        this.username = userName;
    }

    setPassword(password: string){
        this.checkPassword(password);
        this.password = password;
    }

    private checkEmail(email: string){
        const re = /^[\w.-]+@([\w-]+\.)+[a-zA-Z]{2,}$/;
        if(!email.toLowerCase().match(re))
            throw new Error('email is not valid');
    }

    private checkPassword(password: string){
        if(password.length < 10)
            throw new Error('password is too short');
    }

    validate(user: {
        email: string, 
        username: string, 
        password: string
    }) {
        this.checkEmail(user.email);
        this.checkPassword(user.password);
    }
    
    equals(user: User): boolean{
        return (
            this.id === user.getId() &&
            this.createdAt === user.getCreatedAt() &&
            this.email === user.email && 
            this.username === user.username &&
            this.password === user.password
        )
    }
};
