import {
    Exercise as ExercisePrisma,
    Workout as WorkoutPrisma,
    WorkoutExercise as WorkoutExercisePrisma,
} from '@prisma/client';
import { Exercise } from './exercise';

export class Workout {
    readonly id: number;
    readonly userId: number;
    readonly name: string;
    readonly description: string;
    readonly exercises: Exercise[];

    constructor(workout: {
        id: number;
        userId: number;
        name: string;
        description: string;
        exercises: Exercise[];
    }) {
        this.validate(workout);
        this.id = workout.id;
        this.userId = workout.userId;
        this.name = workout.name;
        this.description = workout.description;
        this.exercises = workout.exercises || [];
    }
    validate(workout: { id: number; userId: number; name: string; description: string }) {
        if (!workout.name || typeof workout.name !== 'string' || workout.name.trim().length === 0) {
            throw new Error('Workout name is required and cannot be empty.');
        }
    }

    addExercise(exercise: Exercise): void {
        this.exercises.push(exercise);
    }

    removeExercise(exerciseId: number): void {
        const index = this.exercises.findIndex((exercise) => exercise.id === exerciseId);
        if (index === -1) {
            throw new Error('Exercise does not exist in this workout.');
        }
        if (index !== -1) {
            this.exercises.splice(index, 1);
        }
    }

    equals({
        id,
        userId,
        name,
        description,
        exercises,
    }: {
        id: number;
        userId: number;
        name: string;
        description: string;
        exercises: Exercise[];
    }): boolean {
        return (
            this.id === id &&
            this.userId === userId &&
            this.name === name &&
            this.description === description &&
            this.exercises.every((exercise, index) => exercise.equals(exercises[index]))
        );
    }

    static from({
        id,
        userId,
        name,
        description,
        exercises,
    }: WorkoutPrisma & {
        exercises: (ExercisePrisma & { workoutExercise: WorkoutExercisePrisma })[];
    }) {
        return new Workout({
            id,
            userId,
            name,
            description,
            exercises: exercises.map((exercise) => Exercise.from(exercise)),
        });
    }
}
