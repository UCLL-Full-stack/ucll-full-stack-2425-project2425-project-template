import { Album } from "./album";

export class Artist{
    private readonly id?: number;
    private readonly name: string;
    private bio?: string;
    private albums?: Album[];

    constructor(artist: {
        name: string,
        bio?: string,
        albums?: Album[]
    }){
        this.validate(artist);
        this.name = artist.name;
        this.bio = artist.bio;
        this.albums = artist.albums;
    }

    validate(artist: {
        name: string
    }){
        if(!artist.name){
            throw new Error('artist name cannot be empty');
        }
    }

    getId(): number | undefined{
        return this.id;
    }

    getName(): string{
        return this.name;
    }

    getBio(): string | undefined{
        return this.bio;
    }

    getAlbums(): Album[] | undefined{
        return this.albums;
    }

    equals(artist: Artist): boolean{
        return(
            this.name == artist.name &&
            this.bio == artist.bio &&
            this.albums?.toString() == artist.albums?.toString()
        )
    }
};
