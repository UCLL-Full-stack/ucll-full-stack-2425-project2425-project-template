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


}