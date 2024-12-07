type Role = 'admin' | 'user';

type UserInput = {
    id?: number;
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: Role;
    password?: string,
};

type PlaylistInput = {
    id?: number;
    name?: string;
    totalNumbers?: number;
    user?: UserInput;
}

type SongInput = {
    id?: number;
    title?: string;
    genre?: string;
}

type AuthenticationResponse = {
    token: string;
    username: string;
    fullname: string;
    role: string;
    id?: number;
};

type AddSongInput = {
    playlist: PlaylistInput;
    songs: SongInput[];
};


export {
    Role,
    UserInput,
    PlaylistInput,
    SongInput,
    AuthenticationResponse,
    AddSongInput
}