import { Role } from "../types";

export class User {
    userId? : number;
    username : string;
    password : string;
    role : Role;
    attendance? : number;

    constructor (user: {
        id? : number,
        username : string,
        password : string,
        role : Role,
        attendance? : number
    }) {
        this.userId = user.id;
        this.username = user.username;
        this.password = user.password;
        this.role = user.role;
        this.attendance = user.attendance;
    }
}