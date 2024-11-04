import { Role } from "../types";
import { User } from "./User";

export class Team {
    teamId? : number;
    members? : Array<User>; // Unusable for now
    coach : User;

    constructor (team: {
        teamId? : number,
        members? : Array<User>, // Unusable for now
        coach : User,
    }) {
        this.teamId = team.teamId;
        this.members = team.members || new Array<User>(); // Unusable for now
        this.coach = team.coach;
    }
}