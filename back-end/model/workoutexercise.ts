import {
    Workout as WorkoutPrisma,
    Exercise as ExercisePrisma,
    WorkoutExercise as WorkoutExercisePrisma,
    User as UserPrisma,
} from '@prisma/client';
import { Workout } from './workout';
import { Exercise } from './exercise';

export class WorkoutExercise {
    readonly id?: string;
    readonly workout: Workout;
    readonly exercise: Exercise;
    readonly sets: number;
    readonly reps: number;
    readonly rpe: string;
    readonly restTime: string;

    constructor(workoutExercise: {
        id?: string;
        workout: Workout;
        exercise: Exercise;
        sets: number;
        reps: number;
        rpe: string;
        restTime: string;
    }) {
        this.id = workoutExercise.id;
        this.workout = workoutExercise.workout;
        this.exercise = workoutExercise.exercise;
        this.sets = workoutExercise.sets;
        this.reps = workoutExercise.reps;
        this.rpe = workoutExercise.rpe;
        this.restTime = workoutExercise.restTime;
    }

    validate() {
        if (this.sets <= 0) {
            throw new Error('Sets must be greater than zero.');
        }
        if (this.reps <= 0) {
            throw new Error('Reps must be greater than zero.');
        }
    }

    static from({
        id,
        workout,
        exercise,
        sets,
        reps,
        rpe,
        restTime,
    }: WorkoutExercisePrisma & {
        workout: WorkoutPrisma & { user: UserPrisma };
        exercise: ExercisePrisma;
    }) {
        return new WorkoutExercise({
            id,
            workout: Workout.from(workout),
            exercise: Exercise.from(exercise),
            sets,
            reps,
            rpe,
            restTime: restTime,
        });
    }
}
