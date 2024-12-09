export type Role = "ADMIN" | "Coach" | "Player" | "Guest"

export type User = {
    userId?: number;
    username: string;
    password: string;
    role: Role;
    attendance?: number;
}

export type Training = {
    trainingId?: number;
    date: Date;
    hall: string;
    square: number;
    players?: Array<User>;
    coach: User;
}

export type Team = {
    teamId?: number;
    members?: Array<User>;
    coach: User;
}

export type Match = {
    matchId?: number;
    date: Date;
    hall: string;
    square: number;
    players?: Array<User>;
}