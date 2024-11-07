import { Role } from "../types";

export class User {
    userId? : number;
    username : string;
    password : string;
    role : Role;
    attendance? : number;

    constructor (user: {
        userId? : number,
        username : string,
        password : string,
        role : Role,
        attendance? : number
    }) {
        this.userId = user.userId;
        this.username = user.username;
        this.password = user.password;
        this.role = user.role;
        this.attendance = user.attendance;
    }
}

export default User;
