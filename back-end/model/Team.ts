import { Role } from "../types";
import { User } from "./User";

import {
    Team as TeamPrisma,
    User as UserPrisma
} from '@prisma/client';


export class Team {
    private teamId? : number;
    private players? : Array<User>; 
    private coach : User;

    constructor (team: {
        teamId? : number,
        players? : Array<User>, 
        coach : User,
    }) {
        this.teamId = team.teamId;
        this.players = team.players || new Array<User>(); 
        this.coach = team.coach;
    }
    getId() {
        return this.teamId;
    }

    static from ({
        teamId,
        players,
        coach
    }: TeamPrisma & { players: UserPrisma[], coach: UserPrisma }): Team {
    
        return new Team({
            teamId,
            players: players
                .filter((player: UserPrisma) => player.role === "PLAYER")
                .map((player: any) => User.from(player)),
            coach: coach.role === "COACH" ? User.from(coach) : (() => { throw new Error("Team has no coach"); })() 
        });
    }

}