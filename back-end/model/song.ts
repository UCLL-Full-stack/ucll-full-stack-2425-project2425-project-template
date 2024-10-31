import { Duration } from "../types";
import { Album } from "./album";
import { Artist } from "./artist";

export class Song{
    private readonly id?: number;
    private readonly title: string;
    private readonly duration: Duration;
    private readonly album: Album;
    private readonly artists: Artist[];

    constructor(song:{
        title: string,
        duration: Duration,
        album: Album,
        artists: Artist[]
    }){
        this.title = song.title;
        this.duration = song.duration;
        this.album = song.album;
        this.artists = song.artists;
    }

    getId(): number | undefined{
        return this.id;
    }

    getTitle(): string{
        return this.title;
    }

    getDuration():Duration{
        return this.duration;
    }

    getAlbum(): Album{
        return this.album;
    }

    getArtists(): Artist[]{
        return this.artists;
    }

    equals(song:{
        title: string,
        duration: Duration,
        album: Album,
        artists: Artist[]
    }){
        return (
            this.title == song.title &&
            this.duration == song.duration &&
            this.album == song.album &&
            this.artists == song.artists
        )
    }
};
