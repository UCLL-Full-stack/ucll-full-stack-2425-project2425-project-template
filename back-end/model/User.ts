import { Role } from "../types";
import {
    User as UserPrisma
} from '@prisma/client';


export class User {
    private userId? : number ;
    private firstName : string;
    private lastName : string;
    private password : string;
    private role : Role;
    private attendance? : number | null;

    constructor (user: {
        userId? : number,
        firstName : string,
        lastName : string,
        password : string,
        role : Role,
        attendance? : number | null
    }) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.password = user.password;
        this.role = user.role;
        this.attendance = user.attendance;
    }
    getuserId() {
        return this.userId;
    }

    static from({
        userId,
        firstName,
        lastName,
        password,
        role,
        attendance
    }: UserPrisma): User {
    
        return new User({
            userId,
            firstName,
            lastName,
            password,
            role,
            attendance 
        });
    } 
}
