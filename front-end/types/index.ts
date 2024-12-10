export type Competition = {
    id?: number;
    name: string;
    teams: Team[];
};

export type Team = {
    id: number;
    name: string;
    players: Player[];
    coaches: Coach[];
};

export type Player = {
    id: number;
    number: number;
    user: User;
};

export type Coach = {
    id: number;
    user: User;
};

export type User = {
    id: number;
    name: string;
    email: string;
    role: Role;
};

export type StatusMessage = {
    message: string;
    type: "error" | "success";
};

export type UserLogin = {
    name: string;
    password: string;
  };

export type Role = 'admin' | 'player' | 'coach';