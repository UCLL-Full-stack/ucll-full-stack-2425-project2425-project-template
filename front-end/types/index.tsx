type Role = 'admin' | 'user';

type User = {
    id?: number;
    firstName?: string;
    lastName?: string;
    username?: string;
    email?: string;
    password?: string;
    role?: string
    fullname?: string;
}

type Playlist = {
    id?: number;
    name: string;
    totalNumbers: number;
    user: User,
    songs: Song[]
}

type Song = {
    id: number;
    title: string;
    genre: string;
}

export type StatusMessage = {
    message: string;
    type: "error" | "success";
};

// type AuthenticationResponse = {
//     token?: string;
//     rnummer?: string;
//     email?: string;
// }

export type {
    Role,
    User,
    Song,
    Playlist,
}