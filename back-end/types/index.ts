type Role = 'admin' | 'user';
type SubscriptionType = 'basic' | 'premium'

type UserInput = {
    id?: number;
    username?: string;
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: Role;
    password?: string,
    subscription?: SubscriptionInput;
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

type SubscriptionInput = {
    id?: number;
    type?: SubscriptionType;
    start_date?: Date;
    duration?: number;
};


export {
    Role,
    UserInput,
    PlaylistInput,
    SongInput,
    AuthenticationResponse,
    AddSongInput,
    SubscriptionInput,
    SubscriptionType
}