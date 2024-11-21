import { Gebruiker } from './gebruiker';
import { Race } from './race';

export class SubmissionForm {
    public id?: number;
    private title: string;
    private content: string;
    private user: Gebruiker;
    private race: Race;

    constructor(submissionForm: { title: string, content: string, user: Gebruiker, race: Race, id?: number }) {
        this.validate(submissionForm);

        this.title = submissionForm.title;
        this.content = submissionForm.content;
        this.user = submissionForm.user;
        this.race = submissionForm.race;
        if (submissionForm.id) this.id = submissionForm.id;
    }

    private validate(submissionForm: { title: string, content: string, user: Gebruiker, race: Race, id?: number }): void {
        if (!submissionForm.title) {
            throw new Error('Title is required');
        }
        if (!submissionForm.content) {
            throw new Error('Content is required');
        }
        if (!submissionForm.user) {
            throw new Error('User is required');
        }
        if (!submissionForm.race) {
            throw new Error('Race is required');
        }
    }

    getId(): number | undefined {
        return this.id;
    }

    getTitle(): string {
        return this.title;
    }

    getContent(): string {
        return this.content;
    }

    getUser(): Gebruiker {
        return this.user;
    }

    getRace(): Race {
        return this.race;
    }

    equals(other: SubmissionForm): boolean {
        return (
            this.id === other.id &&
            this.title === other.title &&
            this.content === other.content &&
            this.user.equals(other.getUser()) &&
            this.race === other.getRace()
        );
    }
}