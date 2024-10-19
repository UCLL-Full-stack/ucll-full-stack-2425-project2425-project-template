import { Role } from "../types";

export class User {
    private name: String;
    private email: String;
    private password: String;
    private role: Role;


    constructor(user: {name: String, email: String, password: String, role: Role}) {
        this.validate(user);

        this.name = user.name;
        this.email = user.email;
        this.password = user.password;
        this.role = user.role;
    }

    validate(user: {name: String, email: String, password: String, role: Role}) {
       
    }

    getName(): String {
        return this.name;
    }

    getEmail(): String {
        return this.email;
    }

    getPassword(): String {
        return this.password;
    }

    getRole(): Role {
        return this.role;
    }
}
