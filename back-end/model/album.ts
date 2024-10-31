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
        title: string,
        duration: Duration,
        artists: Artist[],
        songs: Song[],
        releaseDate: Date
    }){
        this.title = album.title;
        this.duration = album.duration;
        this.artists = album.artists;
        this.songs = album.songs;
        this.releaseDate = album.releaseDate;
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

    getSongs(): Song[]{
        return this.songs;
    }

    getReleaseDate(): Date{
        return this.releaseDate;
    }

    equals(album: Album){
        return (
            this.title == album.title &&
            this.duration == album.duration &&
            this.artists == album.artists &&
            this.songs == album.songs &&
            this.releaseDate == album.releaseDate
        )
    }
}
