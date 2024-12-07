import { Song } from "./song";
import {Playlist as PlaylistPrisma} from '@prisma/client'
import {Song as SongPrisma} from '@prisma/client'
import {User as UserPrisma} from '@prisma/client'
import { User } from "./user";
export class Playlist {
    private id?: number;
    private name: string;
    private totalNumbers: number;
    private songs: Song[];
    private user: User;

    constructor(playlist: { id?: number; name: string; totalNumbers: number; songs: Song[], user: User}) {
        this.validate(playlist);

        this.id = playlist.id;
        this.name = playlist.name;
        this.totalNumbers = playlist.totalNumbers ?? 0;
        this.songs = playlist.songs || [];
        this.user = playlist.user;
    }

    validate(playlist: { name: string; totalNumbers: number; user: User }) {
        if (!playlist.name) {
            throw new Error('Playlist name is required!')
        }
        if (!playlist.user) {
            throw new Error('User is required')
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

    addSongtoPlaylist(song: Song) {
        if (!this.songs.includes(song)) {
            this.songs.push(song);
        }
    }

    getSongs(): Song[] {
        return this.songs
    }

    getUser(): User {
        return this.user
    }

    equals(playlist: Playlist): boolean {
        return (
            this.id === playlist.getId() &&
            this.name === playlist.getName() &&
            this.totalNumbers === playlist.getTotalNumbers() &&
            this.songs.every((song, index) => song.equals(playlist.getSongs()[index])) &&
            this.user.equals(playlist.getUser())
        );
    }

     static from({
        id,
        name,
        totalNumbers,
        songs,
        user
    }: PlaylistPrisma & { 
        songs: SongPrisma[], 
        user: UserPrisma 
    }) {    
        return new Playlist({
            id,
            name,
            totalNumbers,
            songs: songs.map((song) => Song.from(song)),
            user: User.from(user)
        })
    }
}