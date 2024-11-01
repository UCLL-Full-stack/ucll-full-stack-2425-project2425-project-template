import { Library } from './Library';
import { Profile } from './Profile';

export class User {
    private id: number;
    private username: string;
    private password: string;
    private library: Library;
    private profile: Profile;
    private balance: number;

    constructor(user: {
        id: number;
        username: string;
        password: string;
        library: Library;
        profile: Profile;
        balance: number;
    }) {
        this.validate(user);

        this.id = user.id;
        this.username = user.username;
        this.password = user.password;
        this.library = user.library;
        this.profile = user.profile;
        this.balance = user.balance;
    }

    getId(): number {
        return this.id;
    }

    getUsername(): string {
        return this.username;
    }

    getPassword(): string {
        return this.password;
    }

    getLibrary(): Library {
        return this.library;
    }

    getProfile(): Profile {
        return this.profile;
    }

    getBalance(): number {
        return this.balance;
    }

    validate(user: {
        id: number;
        username: string;
        password: string;
        library: Library;
        profile: Profile;
        balance: number;
    }) {
        if (!user.username?.trim()) {
            throw new Error('Username is required');
        }
        if (!user.password?.trim()) {
            throw new Error('Password is required');
        }
        if (user.balance === undefined || isNaN(user.balance)) {
            throw new Error('Balance is required and must be a number');
        }
        if (!user.library) {
            throw new Error('Library is required');
        }
        if (!user.profile) {
            throw new Error('Profile is required');
        }
    }

    equals(user: User): boolean {
        return (
            this.username === user.getUsername() &&
            this.password === user.getPassword() &&
            this.library === user.getLibrary() &&
            this.profile === user.getProfile() &&
            this.balance === user.getBalance()
        );
    }
}
