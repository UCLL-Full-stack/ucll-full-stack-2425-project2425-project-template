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
    number: number;
}

type CoachInput = {
    id?: number;
    user: UserInput;
}

type UserInput = {
    id?: number;
    name: string;
    email: string;
    password: string;
    role: Role;
};

export {
    CompetitionInput,
    TeamInput,
    PlayerInput,
    CoachInput,
    UserInput,
};