import { Profile } from './profile';
import { Role } from '../types/index';
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
    private role: Role;
    private password: string;
    private profile?: Profile;

    constructor(user: {
        id?: number;
        userName: string;
        email: string;
        role: string;
        password: string;
        profile?: Profile;
    }) {
        this.validate(user);
        this.id = user.id;
        this.userName = user.userName;
        this.email = user.email;
        this.role = user.role as Role;
        this.password = user.password;
        this.profile = user.profile;
    }
    isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    validate(user: {
        userName: string;
        email: string;
        role: string;
        password: string;
        profile?: Profile;
    }) {
        if (!user.userName?.trim()) throw new Error('Username is required.');
        if (!user.email?.trim()) throw new Error('Email is required.');
        if (!this.isValidEmail(user.email)) throw new Error('Email is not of right format.');
        if (!user.role?.trim()) throw new Error('Role is required.');
        if (!['User', 'Admin', 'Mod'].includes(user.role))
            throw new Error('Role should be User or Admin');
        if (!user.password?.trim()) throw new Error('Password is required.');
        // Profile is validated with creation of profile
    }

    getId(): number {
        if (this.id) {
            return this.id;
        }
        return 0;
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

    getRole(): Role {
        return this.role;
    }

    getProfile(): Profile | undefined {
        return this.profile;
    }

    static from = ({
        id,
        userName,
        email,
        role,
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
            role: role as Role,
            password,
            profile: profile ? Profile.from(profile) : undefined,
        });
    };
}
