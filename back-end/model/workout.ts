import { Exercise } from "./exercise";

export class Workout {
    readonly workout_id: number;
    readonly user_id: number;
    readonly name: string;
    readonly description: string;
    readonly exercises: Exercise[];

    constructor(workout: { workout_id: number; user_id: number; name: string; description: string; exercises: Exercise[] }) {
        this.validate(workout);
        this.workout_id = workout.workout_id;
        this.user_id = workout.user_id;
        this.name = workout.name;
        this.description = workout.description;
        this.exercises = workout.exercises || [];
    }
    validate(workout: { workout_id: number; user_id: number; name: string; description: string; }) {
        if (!workout.name || typeof workout.name !== 'string' || workout.name.trim().length === 0) {
            throw new Error("Workout name is required and cannot be empty.");
        }
    }

    addExercise(exercise: Exercise): void {
            this.exercises.push(exercise);
    }


    equals({ workout_id, user_id, name, description, exercises }: { workout_id: number; user_id: number; name: string; description: string; exercises: Exercise[] }): boolean {
        return (
            this.workout_id === workout_id &&
            this.user_id === user_id &&
            this.name === name &&
            this.description === description &&
            this.exercises.every((exercise, index) => exercise.equals(exercises[index]))
        );
    }
}
