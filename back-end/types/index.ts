type Role = 'admin' | 'owner' | 'player';

type UserInput = {
    id?: number;
    name: string;
    password: string;
    role: Role;
};

type TeamInput = {
    id?: number;
    name: string;
    points: number;
    owner: UserInput;
    competitionId: number;
};

type CompetitionInput = {
    id?: number;
    name: string;
    matchesPlayed: number;
    teams: TeamInput[];
};

type MatchInput = {
    id?: number;
    date: Date;
    score: string;
    team1: TeamInput;
    team2: TeamInput;
    scoreTeam1: number;
    score2Team2: number;
    competition: CompetitionInput;
};

export { Role, UserInput, TeamInput, CompetitionInput, MatchInput };
