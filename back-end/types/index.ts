type Role = 'admin' | 'user';

type UserInput = {
    id?: number;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    playlists:PlaylistInput[];
    role: Role;
}

type PlaylistInput = {
    id?: number;
    name?: string;
    totalNumbers?: number;
}

type SongInput = {
    id?: number;
    title?: string;
    genre?: string;
}

type AuthenticationResponse = {
    token?: string;
    username?: string;
    email?: string;
    role?: string;
}


export {
    Role,
    UserInput,
    PlaylistInput,
    SongInput,
    AuthenticationResponse
}