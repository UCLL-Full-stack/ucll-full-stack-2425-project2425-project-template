import { Role } from "../types";
import { User } from "./User";

export class Team {
    teamId : number;
    members? : Array<Members>;
    coach : User;

    constructor (team: {
        id : number,
        members? : Array<Members>,
        coach : User,
    }) {
        this.teamId = team.id;
        this.members = team.members || new Array<Members>();
        this.coach = team.coach;
    }
}