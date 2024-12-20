import { Profile as ProfilePrisma } from '@prisma/client';

export class Profile {
    readonly id?: string;
    readonly bio: string;
    readonly userId: string;

    constructor(profile: { id?: string; bio: string; userId: string }) {
        this.id = profile.id;
        this.bio = profile.bio;
        this.userId = profile.userId;
    }

    validate(profile: { id: string; bio: string; userId: string }) {
        if (!profile.bio || typeof profile.bio !== 'string' || profile.bio.trim().length === 0) {
            throw new Error('Bio is required and cannot be empty.');
        }
    }

    equals({ id, bio }: { id: string; bio: string; userId: string }) {
        return this.id === id && this.bio === bio;
    }

    static from({ id, bio, userId }: ProfilePrisma): Profile {
        return new Profile({
            id,
            bio,
            userId,
        });
    }
}
