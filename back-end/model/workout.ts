import { Workout as WorkoutPrisma } from '@prisma/client';
export class Workout {
    readonly id: string;
    readonly userId: string;
    readonly name: string;
    readonly description: string | null;

    constructor(workout: WorkoutPrisma) {
        this.id = workout.id;
        this.userId = workout.userId;
        this.name = workout.name;
        this.description = workout.description;
    }

    validate(workout: {
        id: string;
        userId: string;
        name: string;
        description: string | null;
    }) {
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

    static from(workoutprisma: WorkoutPrisma) {
        return new Workout({
            id: workoutprisma.id,
            userId: workoutprisma.userId,
            name: workoutprisma.name,
            description: workoutprisma.description,
        });
    }
}
