import { Role } from "../types";



export class User {
    private userId? : number;
    private firstName : string;
    private lastName : string;
    private password : string;
    private role : Role;
    private attendance? : number;

    constructor (user: {
        userId? : number,
        firstName : string,
        lastName : string,
        password : string,
        role : Role,
        attendance? : number
    }) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.password = user.password;
        this.role = user.role;
        this.attendance = user.attendance;
    }
    getId() {
        return this.userId;
    }
    
}
