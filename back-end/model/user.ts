import { Profile } from './profile';

import {
    User as userPrisma,
    Profile as profilePrisma,
    Category as categoryPrisma,
    Location as locationPrisma,
} from '@prisma/client';

export class User {
    private id?: number;
    private userName: string;
    private email: string;
    private password: string;
    private profile?: Profile;

    constructor(user: {
        id?: number;
        userName: string;
        email: string;
        password: string;
        profile?: Profile;
    }) {
        this.validate(user);
        this.id = user.id;
        this.userName = user.userName;
        this.email = user.email;
        this.password = user.password;
        this.profile = user.profile;
    }

    validate(user: { userName: string; email: string; password: string; profile?: Profile }) {
        if (!user.userName?.trim()) throw new Error('Username is required.');
        if (!user.email?.trim()) throw new Error('Email is required.');
        if (!user.password?.trim()) throw new Error('Password is required.');
        // Profile is validated with creation of profile
    }

    getUserName(): string {
        return this.userName;
    }

    getPassword(): string {
        return this.password;
    }

    getEmail(): string {
        return this.email;
    }

    getProfile(): Profile | undefined {
        return this.profile;
    }

    static from = ({
        id,
        userName,
        email,
        password,
        profile,
    }: userPrisma & {
        profile?:
            | (profilePrisma & {
                  location: locationPrisma;
                  category: categoryPrisma;
              })
            | null;
    }) => {
        return new User({
            id,
            userName,
            email,
            password,
            profile: profile ? Profile.from(profile) : undefined,
        });
    };
}
