export class WorkoutExercise {
    readonly workout_exercise_id: number;
    readonly workout_id: number;
    readonly exercise_id: number;
    readonly sets: number;
    readonly reps: number;
    readonly rpe: string;
    readonly rest_time: string;

    constructor(workoutExercise: { workout_exercise_id: number; workout_id: number; exercise_id: number; sets: number; reps: number; rpe: string; rest_time: string }) {
        this.validate(workoutExercise);
        this.workout_exercise_id = workoutExercise.workout_exercise_id;
        this.workout_id = workoutExercise.workout_id;
        this.exercise_id = workoutExercise.exercise_id;
        this.sets = workoutExercise.sets;
        this.reps = workoutExercise.reps;
        this.rpe = workoutExercise.rpe;
        this.rest_time = workoutExercise.rest_time;
    }
    validate(workoutExercise: { workout_exercise_id: number; workout_id: number; exercise_id: number; sets: number; reps: number; rpe: string; rest_time: string; }) {
        
    }

    equals({ workout_exercise_id, workout_id, exercise_id, sets, reps, rpe, rest_time }: { workout_exercise_id: number; workout_id: number; exercise_id: number; sets: number; reps: number; rpe: string; rest_time: string }): boolean {
        return (
            this.workout_exercise_id === workout_exercise_id &&
            this.workout_id === workout_id &&
            this.exercise_id === exercise_id &&
            this.sets === sets &&
            this.reps === reps &&
            this.rpe === rpe &&
            this.rest_time === rest_time
        );
    }
}