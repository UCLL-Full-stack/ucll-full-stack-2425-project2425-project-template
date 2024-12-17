import { Exercise as ExercisePrisma } from '@prisma/client';
import { WorkoutExercise as WorkoutExercisePrisma } from '@prisma/client';
import { WorkoutExercise } from './workoutexercise';

export class Exercise {
    readonly id: string;
    readonly name: string;
    readonly description: string | null;
    readonly videoLink: string | null;

    constructor(exercise: {
        id: string;
        name: string;
        description: string | null;
        videoLink: string | null;
    }) {
        this.id = exercise.id;
        this.name = exercise.name;
        this.description = exercise.description;
        this.videoLink = exercise.videoLink;
    }
    validate(exercise: {
        id: string;
        name: string;
        description: string | null;
        videoLink: string | null;
    }) {
        if (
            !exercise.name ||
            typeof exercise.name !== 'string' ||
            exercise.name.trim().length === 0
        ) {
            throw new Error('Name is required and cannot be empty.');
        }
        if (
            exercise.description &&
            (typeof exercise.description !== 'string' || exercise.description.trim().length === 0)
        ) {
            throw new Error('Description must be a string and cannot be empty.');
        }
        if (
            exercise.videoLink &&
            (typeof exercise.videoLink !== 'string' || exercise.videoLink.trim().length === 0)
        ) {
            throw new Error('Video link must be a string and cannot be empty.');
        }
    }
    equals({
        id,
        name,
        description,
        videoLink,
    }: {
        id: string;
        name: string;
        description: string | null;
        videoLink: string | null;
    }): boolean {
        return (
            this.id === id &&
            this.name === name &&
            this.description === description &&
            this.videoLink === videoLink
        );
    }

    static from(exercisePrisma: ExercisePrisma) {
        return new Exercise({
            id: exercisePrisma.id,
            name: exercisePrisma.name,
            description: exercisePrisma.description,
            videoLink: exercisePrisma.videoLink,
        });
    }
}
