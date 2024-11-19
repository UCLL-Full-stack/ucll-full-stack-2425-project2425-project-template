import { Album } from "./album";
import { User } from "./user";

export class List{
    private readonly id?: number;
    private readonly createdAt: number;
    private readonly user?: User;
    private title: string;
    private description: string;
    private albums: Album[];

    constructor(list: {
        id?: number,
        user?: User,
        title: string, 
        description: string,
        albums: Album[]
    }){
        this.validate(list);
        this.id = list.id;
        this.user = list.user;
        this.title = list.title;
        this.description = list.description;
        this.albums = list.albums;
        this.createdAt = Date.now();
    }

    validate(list: {
        title: string,
        description: string,
        albums: Album[]
    }){
        if(!list.title || !list.description){
            throw new Error('title and description cannot be empty');
        }

        if(!list.albums || list.albums.length == 0){
            throw new Error('list albums cannot be empty');
        }
    }

    getId(): number | undefined{
        return this.id;
    }

    getUser(): User | undefined{
        return this.user;
    }

    getTitle(): string{
        return this.title;
    }

    getDescription(): string{
        return this.description;
    }

    getAlbums(): Album[]{
        return this.albums;
    }

    getCreatedAt(): number{
        return this.createdAt;
    }

    equals(list: List){
        return (
            this.title === list.title &&
            this.description === list.description &&
            this.albums.toString() === list.albums.toString()
        )
    }
};
