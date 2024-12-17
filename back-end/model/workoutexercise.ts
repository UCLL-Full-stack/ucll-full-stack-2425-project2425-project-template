import { WorkoutExercise as WorkoutExercisePrisma } from '@prisma/client';

export class WorkoutExercise {
    readonly id: string;
    readonly workoutId: string;
    readonly exerciseId: string;
    readonly sets: number | null;
    readonly reps: number | null;
    readonly rpe: number | null;
    readonly restTime: number | null;

    constructor(workoutExercise: WorkoutExercisePrisma) {
        this.id = workoutExercise.id;
        this.workoutId = workoutExercise.workoutId;
        this.exerciseId = workoutExercise.exerciseId;
        this.sets = workoutExercise.sets;
        this.reps = workoutExercise.reps;
        this.rpe = workoutExercise.rpe;
        this.restTime = workoutExercise.restTime;
    }

    validate(workoutExercise: {
        id: string;
        workoutId: string;
        exerciseId: string;
        sets: number | null;
        reps: number | null;
        rpe: number | null;
        restTime: number | null;
    }) {
        if (!workoutExercise.workoutId || typeof workoutExercise.workoutId !== 'string') {
            throw new Error('Workout ID is required and must be a string.');
        }
        if (!workoutExercise.exerciseId || typeof workoutExercise.exerciseId !== 'string') {
            throw new Error('Exercise ID is required and must be a string.');
        }
        if (workoutExercise.sets && typeof workoutExercise.sets !== 'number') {
            throw new Error('Sets must be a number.');
        }
        if (workoutExercise.reps && typeof workoutExercise.reps !== 'number') {
            throw new Error('Reps must be a number.');
        }
        if (workoutExercise.rpe && typeof workoutExercise.rpe !== 'number') {
            throw new Error('RPE must be a number.');
        }
        if (workoutExercise.restTime && typeof workoutExercise.restTime !== 'number') {
            throw new Error('Rest time must be a number.');
        }
    }

    equals({
        id,
        workoutId,
        exerciseId,
        sets,
        reps,
        rpe,
        restTime,
    }: {
        id: string;
        workoutId: string;
        exerciseId: string;
        sets: number | null;
        reps: number | null;
        rpe: number | null;
        restTime: number | null;
    }): boolean {
        return (
            this.id === id &&
            this.workoutId === workoutId &&
            this.exerciseId === exerciseId &&
            this.sets === sets &&
            this.reps === reps &&
            this.rpe === rpe &&
            this.restTime === restTime
        );
    }

    static from(workoutExercisePrisma: WorkoutExercisePrisma) {
        return new WorkoutExercise({
            id: workoutExercisePrisma.id,
            workoutId: workoutExercisePrisma.workoutId,
            exerciseId: workoutExercisePrisma.exerciseId,
            sets: workoutExercisePrisma.sets,
            reps: workoutExercisePrisma.reps,
            rpe: workoutExercisePrisma.rpe,
            restTime: workoutExercisePrisma.restTime,
        });
    }
}
