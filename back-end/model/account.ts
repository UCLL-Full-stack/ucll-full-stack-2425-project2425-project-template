import { User } from '../model/user';

export class Account {
    private id?: number;
    private bio: string;
    private user: User;


    constructor(account: {id?: number; bio: string; user: User; }) {
        this.id = account.id;
        this.bio = account.bio;
        this.user = account.user;
    }

    getId(): number | undefined {
        return this.id;
    }

    getBio(): string {
        return this.bio;
    }

    getUser(): User {
        return this.user;
    }

    validate(account: {
        bio: string;
        user: User;
    }) {
        if (!account.bio?.trim()) {
            throw new Error('Bio is required');
        }
        if (!account.user) {
            throw new Error('User is required');
        }
    }
    equals(account: Account): boolean {
        return (
            this.bio === account.getBio() &&
            this.user.equals(account.getUser())
        );
    }

}