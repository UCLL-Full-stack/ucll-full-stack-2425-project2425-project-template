import {
    Workout as WorkoutPrisma,
    User as UserPrisma,
    WorkoutExercise as WorkoutExercisePrisma,
    Exercise as ExercisePrisma,
} from '@prisma/client';

import { User } from './user';
import { WorkoutExercise } from './workoutexercise';
export class Workout {
    readonly id?: string;
    readonly name: string;
    readonly description: string;
    readonly user: User;

    constructor(workout: { id?: string; name: string; description: string; user: User }) {
        this.id = workout.id;
        this.name = workout.name;
        this.description = workout.description;
        this.user = workout.user;
    }

    validate(workout: { id: string; name: string; description: string }) {
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

    equals({ id, name, description, user }: Workout): boolean {
        return (
            this.id === id &&
            this.name === name &&
            this.description === description &&
            this.user === user
        );
    }

    static from({
        id,
        name,
        description,
        user,
    }: WorkoutPrisma & {
        user: UserPrisma;
    }) {
        return new Workout({
            id,
            name,
            description,
            user: User.from(user),
        });
    }
}
