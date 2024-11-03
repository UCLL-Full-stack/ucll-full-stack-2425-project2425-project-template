type Role = 'admin' | 'user';

type UserInput = {
    id?: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    playlists: PlaylistInput[]
}

type PlaylistInput = {
    id?: number;
    name: string;
    totalNumbers: number;
}
type Playlist = {
    id?: number;
    name: string;
    totalNumbers: number;
    songs: Song[]
}



type SongInput = {
    id?: number;
    title: string;
    genre: string;
}

type Song = {
    id?: number;
    title: string;
    genre: string;
}

export type {
    Role,
    UserInput,
    PlaylistInput,
    SongInput,
    Song,
    Playlist
}