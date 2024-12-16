import { Coach } from "./coach";
import { Match } from "./match";
import { Player } from "./player";
import { Team as TeamPrisma, Player as PlayerPrisma, Coach as CoachPrisma, Match as MatchPrisma } from "@prisma/client";

export class Team {
    readonly id: number;
    readonly name: string;
    readonly players?: Player[];
    readonly coaches?: Coach[];  
    readonly matches?: Match[];

    constructor(team: { id: number, name: string, players?: Player[], coaches?: Coach[], matches?: Match[] }) {
        this.id = team.id;
        this.name = team.name;
        this.players = team.players;
        this.coaches = team.coaches;
        this.matches = team.matches;
    }

    getId(): number {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    getPlayers(): Player[] | undefined {
        return this.players;
    }

    getCoaches(): Coach[] | undefined  {
        return this.coaches;
    }

    getMatches(): Match[] | undefined  {
        return this.matches;
    }

    static from({ id, name }: TeamPrisma & {players?: PlayerPrisma} & {coaches?: CoachPrisma} & {matches?: MatchPrisma} ): Team {
        return new Team({
            id,
            name,
        });
    }

    
}