import { User } from "./User";

import {
    Match as MatchPrisma,
    User as UserPrisma
} from '@prisma/client';

export class Match {
    private matchId? : number;
    private date : Date;
    private hall : string;
    private square : number;
    private players? : Array<User>;
    private coach: User;

    constructor (match: {
        matchId? : number,
        date : Date,
        hall : string,
        square : number;
        players : Array<User>;
        coach: User;
    }) {
        this.matchId = match.matchId;
        this.date = match.date;
        this.hall = match.hall;
        this.square = match.square;
        this.players = match.players || new Array<User>();
        this.coach = match.coach;
    }

    getId() {
        return this.matchId;
    }

    static from({
        matchId,
        date,
        hall,
        square,
        players,
        coach
    }: MatchPrisma & { players: UserPrisma[], coach: UserPrisma }): Match {
    
        return new Match({
            matchId,
            date,
            hall,
            square,
            players: players
                .filter((player: UserPrisma) => player.role === "PLAYER")
                .map((player: any) => User.from(player)),
            coach: coach.role === "COACH" ? User.from(coach) : (() => { throw new Error("Match has no coach."); })()
        });
    }
}