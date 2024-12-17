import { Workout as WorkoutPrisma, User as UserPrisma } from '@prisma/client';
import { User } from './user';
export class Workout {
    readonly id: string;
    readonly name: string;
    readonly description: string | null;
    readonly user: User;

    constructor(workout: { id: string; name: string; description: string | null; user: User }) {
        this.id = workout.id;
        this.name = workout.name;
        this.description = workout.description;
        this.user = workout.user;
    }

    validate(workout: { id: string; name: string; description: string | null }) {
        if (!workout.name || typeof workout.name !== 'string' || workout.name.trim().length === 0) {
            throw new Error('Name is required and cannot be empty.');
        }
        if (
            workout.description &&
            (typeof workout.description !== 'string' || workout.description.trim().length === 0)
        ) {
            throw new Error('Description must be a string and cannot be empty.');
        }
    }

    equals({ id, name, description, user }: Workout) {
        return (
            this.id === id &&
            this.name === name &&
            this.description === description &&
            this.user === user
        );
    }

    static from({ id, name, description, user }: WorkoutPrisma & { user: UserPrisma }) {
        return new Workout({
            id,
            name,
            description,
            user: User.from(user),
        });
    }
}
