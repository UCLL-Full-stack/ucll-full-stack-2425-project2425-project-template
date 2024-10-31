export class Invite {
    private id?: number;
    private status: 'pending' | 'confirmed' | 'declined';
    private email: string;

    constructor(invite: {
        id?: number,
        status: 'pending' | 'confirmed' | 'declined',
        email: string;
    }) {
        this.id = invite.id;
        this.status = invite.status;
        this.email = invite.email;
    }

    getId(): number | undefined {
        return this.id;
    }

    getStatus(): string {
        return this.status
    }

    getEmail(): string {
        return this.status
    }

    equals(invite: Invite): boolean {
        return (
            this.status === invite.getStatus() &&
            this.email === invite.getEmail()
        )
    }
}
