import { Role } from "../types";

import {
    Match as MatchPrisma,
    Team as TeamPrisma,
    Training as TrainingPrisma,
    User as UserPrisma
} from "@prisma/client"

export class User {
    private userId? : number;
    private username : string;
    private firstName : string;
    private lastName : string;
    private password : string;
    private role : Role;
    private attendance? : number;

    constructor (user: {
        userId? : number,
        username : string,
        firstName : string,
        lastName : string,
        password : string,
        role : Role,
        attendance? : number
    }) {
        this.userId = user.userId;
        this.username = user.username;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.password = user.password;
        this.role = user.role;
        this.attendance = user.attendance;
    }

    static from ({
        userId,
        username,
        firstName,
        lastName,
        password,
        role,
        attendance,
    }: UserPrisma) {
        return new User ({
            userId,
            username,
            firstName,
            lastName,
            password,
            role,
            attendance,
        })
    }
}