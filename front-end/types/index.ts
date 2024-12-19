export type User = {
    id: number;
    email: string;
    name: string;
    role?: string;
    password: string;
    birthday: Date;
    players: Array<Player>;
};

export type Player = {
    id: number;
    name: string;
    currency: number;
    statistics: string; // still needs to be expended upon
    class: string; // will later be a Class type
    image: string;
    user: User;
};

export type PlayerInput = {
    name: string;
    currency: number;
    statistics: string;
    class: string;
    image: string;
    userEmail: string;
};

export type World = {
    id: number;
    name: string;
    owner: User;
    floors: Floor[];
};

export type Floor = {
    id: number;
    floornumber: number;
    tiles: Line[];
    positions: Position[];
};

export type Line = {
    id: number;
    tiles: string[];
    lineNum: number;
};

export type Position = {
    id: number;
    x: number;
    y: number;
    type: string;
    active: boolean;
    playerID?: number | null;
    image?: string;
};

export type PositionUpdate = {
    posID: number;
    floorID: number;
    playerID: number;
    x: number;
    y: number;
    active: boolean;
};

export type PositionInput = {
  playerID: number;
  x: number;
  y: number;
  type: string;
  active: boolean;
  floorID: number;
}

export type coordinate = {
    x: number;
    y: number;
    posID: number;
};

export type Auth = {
    email: string;
    password: string;
};

export type WorldInput = {
    email: string,
    name: string,
}