import { Song } from "./song";
import {Playlist as PlaylistPrisma} from '@prisma/client'
import {Song as SongPrisma} from '@prisma/client'
export class Playlist {
    readonly id?: number;
    readonly name: string;
    readonly totalNumbers: number;
    readonly songs: Song[] = [];
    constructor(playlist: { id?: number; name: string; totalNumbers: number; songs?: Song[]}) {
        this.validate(playlist);

        this.id = playlist.id;
        this.name = playlist.name;
        this.totalNumbers = playlist.totalNumbers ?? 0;
        this.songs = playlist.songs || [];
    }

    validate(playlist: { name: string; totalNumbers: number }) {
        if (!playlist.name) {
            throw new Error('Playlist name is required!')
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getTotalNumbers(): number {
        return this.totalNumbers
    }

    addSong(song: Song): void {
        this.songs.push(song);
    }

    getSongs(): Song[] {
        return this.songs
    }

    equals(playlist: Playlist): boolean {
        return (
            this.id === playlist.getId() &&
            this.name === playlist.getName() &&
            this.totalNumbers === playlist.getTotalNumbers() &&
            this.songs.every((song, index) => song.equals(playlist.getSongs()[index]))
        );
    }

     static from({
        id,
        name,
        totalNumbers,
        songs,
    }: PlaylistPrisma & { songs?: SongPrisma[] }) {    
        return new Playlist({
            id,
            name,
            totalNumbers,
            songs: songs ? songs.map((song) => Song.from(song)) : [],
        })
    }
}