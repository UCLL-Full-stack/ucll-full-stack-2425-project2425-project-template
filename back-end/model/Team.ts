import { Role } from "../types";
import { User } from "./User";

import {
    Match as MatchPrisma,
    Team as TeamPrisma,
    Training as TrainingPrisma,
    User as UserPrisma
} from "@prisma/client"

export class Team {
    private teamId? : number;
    private members? : Array<User>; // Unusable for now
    private coach : User;

    constructor (team: {
        teamId? : number,
        members? : Array<User>, // Unusable for now
        coach : User,
    }) {
        this.teamId = team.teamId;
        this.members = team.members || new Array<User>(); // Unusable for now
        this.coach = team.coach;
    }

    static from ({
        teamId,
        members,
        coach,
    }: TeamPrisma & { user: UserPrisma; }) {
        return new Team ({
            teamId,
            members,
            coach,
        })
    }

    getId() {
        return this.teamId;
    }
}