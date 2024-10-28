export class Workout {
    readonly workout_id: number;
    readonly user_id: number;
    readonly name: string;
    readonly description: string;

    constructor(workout: { workout_id: number; user_id: number; name: string; description: string; }) {
        this.validate(workout);
        this.workout_id = workout.workout_id;
        this.user_id = workout.user_id;
        this.name = workout.name;
        this.description = workout.description;
    }
    validate(workout: { workout_id: number; user_id: number; name: string; description: string; }) {
        if (!workout.name || typeof workout.name !== 'string' || workout.name.trim().length === 0) {
            throw new Error("Workout name is required and cannot be empty.");
        }
    }

    equals({ workout_id, user_id, name, description }: { workout_id: number; user_id: number; name: string; description: string; }): boolean {
        return (
            this.workout_id === workout_id &&
            this.user_id === user_id &&
            this.name === name &&
            this.description === description 
        );
    }
}
