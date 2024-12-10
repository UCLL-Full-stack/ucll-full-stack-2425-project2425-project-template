export type Permission = 'ADMIN' | 'USER' | 'GUEST';

export type UserInput = {
    username: string;
    password: string;
    name: string;
    surname: string;
    email: string;
    permission: Permission;
    submissions?: SubmissionInput[];
    id?: number;
};

export type SubmissionInput = {
    title: string;
    content: string;
    type: string;
    createdAt: Date;
    solvedAt?: Date;
    createdBy: number;
    id?: number;
};

export type RaceInput = {
    name: string;
    type: string;
    description: string;
    location: string;
    date: Date;
    crashes?: CrashInput[];
    id?: number;
};

export type CrashInput = {
    type: string;
    description: string;
    casualties: number;
    deaths: number;
    participants: ParticipantInput[];
    id?: number;
};

export type ParticipantInput = {
    driver: DriverInput;
    racecar: RacecarInput;
};

export type DriverInput = {
    name: string;
    surname: string;
    birthdate: Date;
    team: string;
    country: string;
    description: string;
};

export type RacecarInput = {
    name: string;
    type: string;
    brand: string;
    hp: number;
};

export type AuthenticationResponse = {
    token: string;
    username: string;
};