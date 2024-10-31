import { Album } from "./album";
import { User } from "./user";

export class List{
    private readonly id?: number;
    private readonly user: User;
    private readonly createdAt: number;
    private title: string;
    private description: string;
    private albums: Album[];

    constructor(list: {
        user: User,
        title: string, 
        description: string,
        albums: Album[]
    }){
        this.user = list.user;
        this.title = list.title;
        this.description = list.description;
        this.albums = list.albums;
        this.createdAt = Date.now();
    }

    getId(): number | undefined{
        return this.id;
    }

    getTitle(): string{
        return this.title;
    }

    getDescription(): string{
        return this.description;
    }

    getCreatedAt(): number{
        return this.createdAt;
    }

    setTitle(title: string){
        this.title = title;
    }

    setDescription(description: string){
        this.description = description;
    }

    addAlbums(albums: Album[]){
        this.checkDuplicateAlbums(albums);
        this.albums = [
            ...this.albums, 
            ...albums
        ];
    }

    private checkDuplicateAlbums(albums: Album[]){
        albums.forEach((newAlbum)=>{
            if(this.albums.find((album)=> album.equals(newAlbum))){
                throw new Error(`album "${newAlbum.getTitle}" already exists in list`);
            }
        });
    }

    equals(list: {
        title: string, 
        description: string, 
        user: User
    }){
        return (
            this.title == list.title &&
            this.description == list.description &&
            this.user == list.user
        )
    }
};
