import { Playlist } from "./playlist";

export class User {
    private id?: number;
    private firstName: string;
    private lastName: string;
    private username: string;
    private email: string;
    private password: string;
    private playlists: Playlist[];

    constructor(user: {
        id?: number;
        firstName: string;
        lastName: string;
        username: string;
        email: string;
        password: string;
        playlists: Playlist[]
    }) {
        this.validate(user);

        this.id = user.id;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
        this.playlists = user.playlists;
    }

    getId(): number | undefined {
        return this.id;
    }

    getFirstName(): string {
        return this.firstName;
    }

    getLastName(): string {
        return this.lastName;
    }

    getUsername(): string {
        return this.username;
    }

    getEmail(): string {
        return this.email;
    }

    getPassword(): string {
        return this.password;
    }

    addPlaylist(playlist: Playlist): void {
        this.playlists.push(playlist);
    }

    getPlaylists(): Playlist[] {
        return this.playlists
    }


    validate(user: {
        firstName: string;
        lastName: string;
        username: string;
        email: string;
        password: string;
        playlists: Playlist[]
    }) {
        if (!user.firstName?.trim()) {
            throw new Error('First name is required');
        }
        if (!user.lastName?.trim()) {
            throw new Error('Last name is required');
        }
        if (!user.username?.trim()) {
            throw new Error('Username is required');
        }
        if (!user.email?.trim()) {
            throw new Error('Email is required');
        }
        if (!user.password?.trim()) {
            throw new Error('Password is required');
        }
    }

    equals(user: User): boolean {
        return (
            this.firstName === user.getFirstName() &&
            this.lastName === user.getLastName() &&
            this.username === user.getUsername() &&
            this.email === user.getEmail() &&
            this.password === user.getPassword() &&
            this.playlists.every((playlist, index) => playlist.equals(user.getPlaylists()[index]))
        );
    }
}