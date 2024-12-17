import {
    WorkoutExercise as WorkoutExercisePrisma,
    Workout as WorkoutPrisma,
    User as UserPrisma,
    Exercise as ExercisePrisma,
} from '@prisma/client';
import { Workout } from './workout';
import { Exercise } from './exercise';

export class WorkoutExercise {
    readonly id: string;
    readonly sets: number | null;
    readonly reps: number | null;
    readonly rpe: number | null;
    readonly restTime: number | null;
    readonly workout: Workout;
    readonly exercise: Exercise;

    constructor(workoutExercise: {
        id: string;
        sets: number | null;
        reps: number | null;
        rpe: number | null;
        restTime: number | null;
        workout: Workout;
        exercise: Exercise;
    }) {
        this.id = workoutExercise.id;
        this.sets = workoutExercise.sets;
        this.reps = workoutExercise.reps;
        this.rpe = workoutExercise.rpe;
        this.restTime = workoutExercise.restTime;
        this.workout = workoutExercise.workout;
        this.exercise = workoutExercise.exercise;
    }

    validate(workoutExercise: {
        id: string;
        sets: number | null;
        reps: number | null;
        rpe: number | null;
        restTime: number | null;
    }) {
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
        sets,
        reps,
        rpe,
        restTime,
        workout,
        exercise,
    }: {
        id: string;
        sets: number | null;
        reps: number | null;
        rpe: number | null;
        restTime: number | null;
        workout: Workout;
        exercise: Exercise;
    }): boolean {
        return (
            this.id === id &&
            this.sets === sets &&
            this.reps === reps &&
            this.rpe === rpe &&
            this.restTime === restTime &&
            this.workout === workout &&
            this.exercise === exercise
        );
    }

    static from({
        id,
        sets,
        reps,
        rpe,
        restTime,
        workout,
        exercise,
    }: WorkoutExercisePrisma & {
        workout: WorkoutPrisma & { user: UserPrisma };
        exercise: ExercisePrisma;
    }) {
        return new WorkoutExercise({
            id,
            sets,
            reps,
            rpe,
            restTime,
            workout: Workout.from(workout),
            exercise: Exercise.from(exercise),
        });
    }
}
