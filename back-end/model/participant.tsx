import { UserInput } from "../types";

export class Participant {
    private id?: number;
    private user: UserInput;


    constructor(participant: {
        id?: number,
        user: UserInput;
    }) {
        this.id = participant.id;
        this.user = participant.user;
    }

    getId(): number | undefined {
        return this.id;
    }

    getUser(): UserInput {
        return this.user;
    }

    equals(participant: Participant): boolean {
        return(
            this.user === participant.getUser()
        );
    }
}