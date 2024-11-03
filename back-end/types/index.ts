type Role = "ADMIN" | "Coach" | "Player" | "Guest"

type UserInput = {
    userId?: number;
    username?: string;
    password?: string;
    role?: Role;
    attendance?: number;
}

type TrainingInput = {
    trainingId?: number;
    date?: Date;
    hall?: string;
    square?: number;
    players?: UserInput[];
    coach?: UserInput;
}

type TeamInput = {
    teamId?: number;
    members?: UserInput[];
    coach?: UserInput;
}

type MatchInput = {
    matchId?: number;
    date?: Date;
    hall?: string;
    square?: number;
    players?: UserInput[];
}

export {
    Role, UserInput, TrainingInput, TeamInput, MatchInput,
}