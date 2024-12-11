import { WorkoutExercise as WorkoutExercisePrisma } from '@prisma/client';
export class WorkoutExercise {
    readonly id: number;
    readonly workoutId: number;
    readonly exerciseId: number;
    readonly sets: number;
    readonly reps: number;
    readonly rpe: string;
    readonly restTime: string;

    constructor(workoutExercise: {
        id: number;
        workoutId: number;
        exerciseId: number;
        sets?: number;
        reps?: number;
        rpe?: string;
        restTime?: string;
    }) {
        this.id = workoutExercise.id;
        this.workoutId = workoutExercise.workoutId;
        this.exerciseId = workoutExercise.exerciseId;
        this.sets = workoutExercise.sets ?? 0;
        this.reps = workoutExercise.reps ?? 0;
        this.rpe = workoutExercise.rpe ?? '';
        this.restTime = workoutExercise.restTime ?? '';
        this.validate(workoutExercise);
    }

    validate(workoutExercise: {
        id: number;
        workoutId: number;
        exerciseId: number;
        sets?: number;
        reps?: number;
        rpe?: string;
        restTime?: string;
    }) {
        if (
            workoutExercise.sets !== undefined &&
            (workoutExercise.sets <= 0 || !Number.isInteger(workoutExercise.sets))
        ) {
            throw new Error('Invalid Sets: Must be a positive integer');
        }
        if (
            workoutExercise.reps !== undefined &&
            (workoutExercise.reps <= 0 || !Number.isInteger(workoutExercise.reps))
        ) {
            throw new Error('Invalid Reps: Must be a positive integer');
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
        id: number;
        workoutId: number;
        exerciseId: number;
        sets: number;
        reps: number;
        rpe: string;
        restTime: string;
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

    static from({ id, workoutId, exerciseId, sets, reps, rpe, restTime }: WorkoutExercisePrisma) {
        return new WorkoutExercise({
            id,
            workoutId,
            exerciseId,
            sets: sets ?? undefined,
            reps: reps ?? undefined,
            rpe: rpe ?? undefined,
            restTime: restTime ?? undefined,
        });
    }
}
