export type Competition = {
    id: number;
    name: string;
    teams: Team[];
};

export type Team = {
    id: number;
    name: string;
}