export class SubmissionForm {
    private type: string;
    private sender: string;
    private acceptance: boolean;

    constructor(type: string, sender: string, acceptance: boolean) {
        this.type = type;
        this.sender = sender;
        this.acceptance = acceptance;
    }

    getType(): string {
        return this.type;
    }

    getSender(): string {
        return this.sender;
    }

    getAcceptance(): boolean {
        return this.acceptance;
    }

    equals(other: SubmissionForm): boolean {
        return (
            this.type === other.getType() &&
            this.sender === other.getSender() &&
            this.acceptance === other.getAcceptance()
        );
    }
}