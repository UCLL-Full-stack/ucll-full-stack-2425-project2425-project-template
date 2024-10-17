import { Role } from "../types";
import { User } from "./User";

export class Match {
    matchId? : number;
    date : Date;
    hall : string;
    square : number;
    players? : Array<Players>; // Unusable for now

    constructor (match: {
        id? : number,
        date : Date,
        hall : string,
        square : number;
        players? : Array<Players>; // Unusable for now
    }) {
        this.matchId = match.id;
        this.date = match.date;
        this.hall = match.hall;
        this.square = match.square;
        this.players = match.players || new Array<Players>(); // Unusable for now
    }
}