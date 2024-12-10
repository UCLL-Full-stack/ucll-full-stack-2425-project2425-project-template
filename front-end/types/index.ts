export type User = {
    id?: number;
    name?: string;
    password?: string;
    birthday?: Date;
    players?: Array<Player>;
}

export type Player = {
    id?: number;
    name?: string;
    currency: number;
    statistics?: string; // still needs to be expended upon
    class?: string; // will later be a Class type
    user?: User;
}

export type World = {
  id?: number;
  name: string;
  owner: User;
  floors: Floor[];
}

export type Floor = {
  id?: number;
  floornumber: number;
  tiles: string[][];
}