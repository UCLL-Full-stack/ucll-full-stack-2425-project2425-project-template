import { Role } from "../types";
import { User } from "./User";

export class Match {
    matchId? : number;
    date : Date;
    hall : string;
    square : number;
    players? : Array<User>; // Unusable for now

    constructor (match: {
        matchId? : number,
        date : Date,
        hall : string,
        square : number;
        players? : Array<User>; // Unusable for now
    }) {
        this.matchId = match.matchId;
        this.date = match.date;
        this.hall = match.hall;
        this.square = match.square;
        this.players = match.players || new Array<User>(); // Unusable for now
    }

    getId() {
        return this.matchId;
    }
}

export default Match;