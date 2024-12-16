type Role = 'admin' | 'player' | 'coach';

type CompetitionInput = {
    id?: number;
    name: string;
    teams: TeamInput[];
};

type TeamInput = {
    id?: number;
    name: string;
    players: PlayerInput[];
    coaches: CoachInput[];
};

type PlayerInput = {
    id?: number;
    user: UserInput;
    team: TeamInput;
    number: number;
}

type CoachInput = {
    id?: number;
    user: UserInput;
    team: TeamInput;
}

type UserInput = {
    id?: number;
    name: string;
    email: string;
    password: string;
    role: Role;
};

type AuthenticationResponse = {
    token: string;
    name: string;
    role: Role;
};

type AuthenticationRequest = {
    name: string;
    password: string;
    role: Role;
}

export {
    CompetitionInput,
    TeamInput,
    PlayerInput,
    CoachInput,
    UserInput,
    Role,
    AuthenticationResponse,
    AuthenticationRequest
};