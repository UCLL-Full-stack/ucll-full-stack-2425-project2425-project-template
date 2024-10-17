import { Role } from "../types";
import { User } from "./User";

export class Training {
    trainingId : number;
    date : Date;
    hall : string;
    square : number;
    players? : Array<Players>; // Unusable for now
    coach : User;

    constructor (training: {
        id : number,
        date : Date,
        hall : string,
        square : number;
        players? : Array<Players>; // Unusable for now
        coach : User;
    }) {
        this.trainingId = training.id;
        this.date = training.date;
        this.hall = training.hall;
        this.square = training.square;
        this.players = training.players || new Array<Players>(); // Unusable for now
        this.coach = training.coach;
    }
}