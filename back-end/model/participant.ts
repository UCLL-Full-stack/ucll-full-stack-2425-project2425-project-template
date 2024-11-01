import { User } from "./user";

export class Participant {
    private id?: number;
    private user: User;


    constructor(participant: {
        id?: number,
        user: User;
    }) {
        this.id = participant.id;
        this.user = participant.user;
    }

    getId(): number | undefined {
        return this.id;
    }

    getUser(): User {
        return this.user;
    }

    equals(participant: Participant): boolean {
        return(
            this.user === participant.getUser()
        );
    }
}