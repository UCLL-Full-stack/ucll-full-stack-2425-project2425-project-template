import { Role } from "../types";
import { User } from "./User";

import {
    Training as TrainingPrisma,
    User as UserPrisma
} from '@prisma/client';

export class Training {
    private trainingId? : number;
    private date : Date;
    private hall : string;
    private square : number;
    private players? : Array<User>; 
    private coach : User;

    constructor (training: {
        trainingId? : number,
        date : Date,
        hall : string,
        square : number;
        players? : Array<User>; 
        coach : User;
    }) {
        this.trainingId = training.trainingId;
        this.date = training.date;
        this.hall = training.hall;
        this.square = training.square;
        this.players = training.players || new Array<User>(); 
        this.coach = training.coach;
    }

    getId() {
        return this.trainingId;
    }

    static from({
        trainingId,
        date,
        hall,
        square,
        players,
        coach
    }: TrainingPrisma & { players: UserPrisma[], coach: UserPrisma }): Training {
    
        return new Training({
            trainingId,
            date,
            hall,
            square,
            players: players
                .filter((player: UserPrisma) => player.role === "PLAYER")
                .map((player: any) => User.from(player)),
            coach: coach.role === "COACH" ? User.from(coach) : (() => { throw new Error("Training has no coach."); })()
        });
    }
}
