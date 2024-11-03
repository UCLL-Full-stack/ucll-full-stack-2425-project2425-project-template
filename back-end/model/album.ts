import { Duration } from "../types";
import { Artist } from "./artist";
import { Song } from "./song";

export class Album{
    private readonly id?: number;
    private readonly title: string;
    private readonly duration: Duration;
    private readonly artists: Artist[];
    private readonly songs: Song[];
    private readonly releaseDate: Date;
    
    constructor(album: {
        id?: number,
        title: string,
        duration: Duration,
        artists: Artist[],
        releaseDate: Date,
        songs: Song[],
    }){
        this.validate(album);
        this.id= album.id;
        this.title = album.title;
        this.duration = album.duration;
        this.artists = album.artists;
        this.songs = album.songs;
        this.releaseDate = album.releaseDate;
    }

    validate(album: {
        title: string,
        duration: Duration,
        artists: Artist[],
        releaseDate: Date,
    }){
        if(!album.title){
            throw new Error('album title cannot be empty');
        }

        if(!album.duration){
            throw new Error('album duration cannot be empty');
        }

        if(!album.artists || album.artists.length == 0){
            throw new Error('album must have at least 1 artist');
        }

        if(!album.releaseDate){
            throw new Error('release date cannot be empty');
        }
    }

    getId(): number | undefined{
        return this.id;
    }

    getTitle(): string{
        return this.title;
    }

    getDuration(): Duration{
        return this.duration;
    }

    getArtists(): Artist[]{
        return this.artists;
    }

    getSongs(): Song[] | undefined{
        return this.songs;
    }

    getReleaseDate(): Date{
        return this.releaseDate;
    }

    equals(album: Album){
        return (
            this.title === album.title &&
            this.duration === album.duration &&
            this.artists.toString() === album.artists.toString() &&
            this.songs.toString() === album.songs.toString() &&
            this.releaseDate === album.releaseDate
        )
    }
}
