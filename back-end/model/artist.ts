import { Album } from "./album";

export class Artist{
    private readonly id?: number;
    private readonly name: string;
    private bio: string;
    private albums: Album[];

    constructor(artist: {
        name: string,
        bio: string,
        albums: Album[]
    }){
        this.name = artist.name;
        this.bio = artist.bio;
        this.albums = artist.albums;
    }

    getId(): number | undefined{
        return this.id;
    }

    getName(): string{
        return this.name;
    }

    getBio(): string{
        return this.bio;
    }

    getAlbums(): Album[] {
        return this.albums;
    }

    addAlbum(newAlbum: Album){
        if(this.albums.find((album)=>album.equals(newAlbum))){
            throw new Error(`album "${newAlbum.getTitle}" is already registered`);
        }
        this.albums.push(newAlbum);
    }

    equals(artist: {
        name: string,
        bio: string,
        albums: Album[]
    }): boolean{
        return(
            this.name == artist.name &&
            this.bio == artist.bio &&
            this.albums == artist.albums
        )
    }
};
