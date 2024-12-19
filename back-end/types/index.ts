export type PositionInput = {
    playerID: number;
    x: number;
    y: number;
    type: string;
    active: boolean;
    floorID: number;
};

export type PositionUpdate = {
    posID: number;
    floorID: number;
    playerID: number;
    x: number;
    y: number;
    active: boolean;
};

export type UserInput = {
    name: string;
    email: string;
    password: string;
    birthday: Date;
};

export type AuthenticationResponse = {
    token: string;
    email: string;
    role: string;
};
