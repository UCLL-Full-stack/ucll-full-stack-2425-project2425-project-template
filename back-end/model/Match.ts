import { Role, MatchInput } from "../types";
import { User } from "./User";



export class Match {
    
    private matchId? : number;
    private date : Date;
    private hall : string;
    private square : number;
    private players? : Array<User>;

    constructor (match: {
        matchId? : number,
        date : Date,
        hall : string,
        square : number;
        players? : Array<User>;
    }) {
        this.matchId = match.matchId;
        this.date = match.date;
        this.hall = match.hall;
        this.square = match.square;
        this.players = match.players || new Array<User>();
    }

    getId() {
        return this.matchId;
    }
}