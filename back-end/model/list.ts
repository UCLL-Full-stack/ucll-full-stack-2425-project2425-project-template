import { 
    List as ListPrisma,
    User as UserPrisma
} from '@prisma/client'
import { User } from './user';

export class List{
    private readonly id?: number;
    private readonly createdAt?: Date;
    private readonly author?: User;
    private title: string;
    private description: string;
    private albumIds: string[];

    constructor(list: {
        id?: number,
        author?: User,
        title: string, 
        description: string,
        albumIds: string[],
        createdAt?: Date
    }){
        this.validate(list);
        this.id = list.id;
        this.author = list.author;
        this.title = list.title;
        this.description = list.description;
        this.albumIds = list.albumIds;
        this.createdAt = list.createdAt;
    }

    static from({
        id,
        author,
        title,
        description,
        albumIds,
        createdAt
    }: ListPrisma & {
        author?: UserPrisma;
    }){
        return new List({
            id: id,
            author: author?User.from(author):undefined,
            title: title,
            description: description,
            albumIds: albumIds,
            createdAt: createdAt
        });
    }

    validate(list: {
        title: string,
        description: string,
        albumIds: string[]
    }){
        if(!list.title || !list.description){
            throw new Error('title and description cannot be empty');
        }

        if(!list.albumIds || list.albumIds.length === 0){
            throw new Error('list albumIds cannot be empty');
        }
    }

    getId(): number | undefined{
        return this.id;
    }

    getAuthor(): User | undefined{
        return this.author;
    }

    getTitle(): string{
        return this.title;
    }

    getDescription(): string{
        return this.description;
    }

    getAlbums(): string[]{
        return this.albumIds;
    }

    getCreatedAt(): Date | undefined{
        return this.createdAt;
    }

    equals(list: List){
        return (
            this.title === list.title &&
            this.description === list.description &&
            this.albumIds.toString() === list.albumIds.toString()
        )
    }
};
