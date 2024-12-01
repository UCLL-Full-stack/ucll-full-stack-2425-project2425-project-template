import { Role } from "../types";
import { Playlist } from "./playlist";
import { User as UserPrisma } from '@prisma/client'
import {Playlist as PlaylistPrisma} from '@prisma/client'
export class User {
    readonly id: number;
    readonly firstName: string;
    readonly lastName: string;
    readonly username: string;
    readonly email: string;
    readonly password: string;
    readonly playlists: Playlist[];
    readonly role: Role;

    constructor(user: {
        id?: number;
        firstName: string;
        lastName: string;
        username: string;
        email: string;
        password: string;
        playlists?: Playlist[];
        role: Role;
    }) {
        this.validate(user);
        this.id = user.id ?? -1;  // Default to a placeholder value if id is undefined
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.username = user.username;
        this.email = user.email;
        this.password = user.password;
        this.playlists = user.playlists ?? [];
        this.role = user.role;
    }

    getId(): number {
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
    getRole(): Role {
        return this.role
    }



    validate(user: {
        firstName: string;
        lastName: string;
        username: string;
        email: string;
        password: string;
        playlists?: Playlist[];
        role: Role;
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
            this.playlists.every((playlist, index) => playlist.equals(user.getPlaylists()[index])) &&
            this.role === user.getRole()
        );
    }

    static from({
        id,
        firstName,
        lastName,
        username,
        password,
        email,
        playlists,
        role,
    }: UserPrisma & { playlists?: PlaylistPrisma[] }) {
        return new User({
            id,
            firstName,
            lastName,
            username,
            password,
            email,
            playlists: playlists ? playlists.map((playlist) => Playlist.from(playlist)) : [],
            role: role as Role,
        });
    }
    
}