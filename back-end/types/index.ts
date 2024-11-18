export type UserInput = {
    username: string;
    password: string;
    id?: number;
};

export type SubmissionFormInput = {
    title: string;
    content: string;
    user: GebruikerInput;
    race: RaceInput;
    id?: number;
};

export type RacecarInput = {
    car_name: string;
    type: string;
    description: string;
    hp: number;
    id?: number;
};

export type DriverInput = {
    name: string;
    team: string;
    description: string;
    age: number;
    racecar: RacecarInput;
    crash: CrashInput;
    id?: number;
};

export type AdminInput = {
    username: string;
    password: string;
    id?: number;
};

export type GebruikerInput = {
    username: string;
    password: string;
    id?: number;
};

export type RaceInput = {
    name: string;
    type: string;
    description: string;
    location: string;
    drivers: DriverInput[];
    crashes: CrashInput[];
    admin?: AdminInput;
    id?: number;
};

export type CrashInput = {
    type: string;
    description: string;
    casualties: number;
    deaths: number;
    id?: number;
};

export type AuthenticationResponse = {
    token: string;
    username: string;
};