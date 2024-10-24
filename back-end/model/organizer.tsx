import { UserInput } from "../types";

export class Organizer {
    private id?: number;
    private user: UserInput;
    private organizationName: string;
    private organizationPass: string;

    constructor(organizer: {
        id?: number,
        user: UserInput,
        organizationName: string,
        organizationPass: string,
    }) {
        this.id = organizer.id;
        this.user = organizer.user;
        this.organizationName = organizer.organizationName;
        this.organizationPass = organizer.organizationPass;
    }

    getId(): number | undefined {
        return this.id;
    }

    getUser(): UserInput {
        return this.user;
    }

    getOrganizationName(): string {
        return this.organizationName;
    }

    getOrganizationPass(): string {
        return this.organizationPass;
    }

    equals(organizer: Organizer): boolean {
        return (
            this.user === organizer.getUser() &&
            this.organizationName === organizer.getOrganizationName() &&
            this.organizationPass === organizer.getOrganizationPass()
        );
    }
}