import { Role } from "../types";
import { User } from "./User";



export class Training {
    private trainingId? : number;
    private date : Date;
    private hall : string;
    private square : number;
    private players? : Array<User>; // Unusable for now
    private coach : User;

    constructor (training: {
        trainingId? : number,
        date : Date,
        hall : string,
        square : number;
        players? : Array<User>; // Unusable for now
        coach : User;
    }) {
        this.trainingId = training.trainingId;
        this.date = training.date;
        this.hall = training.hall;
        this.square = training.square;
        this.players = training.players || new Array<User>(); // Unusable for now
        this.coach = training.coach;
    }
    getId() {
        return this.trainingId;
    }
}
