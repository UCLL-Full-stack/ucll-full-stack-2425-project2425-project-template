export class Workout {
    readonly workout_id: number;
    readonly user_id: number;
    readonly name: string;
    readonly description: string;
    readonly createdAt: Date;
    readonly updatedAt: Date;

    constructor(workout: { workout_id: number; user_id: number; name: string; description: string; createdAt: Date; updatedAt: Date }) {
        this.workout_id = workout.workout_id;
        this.user_id = workout.user_id;
        this.name = workout.name;
        this.description = workout.description;
        this.createdAt = workout.createdAt;
        this.updatedAt = workout.updatedAt;
    }

    equals({ workout_id, user_id, name, description, createdAt, updatedAt }: { workout_id: number; user_id: number; name: string; description: string; createdAt: Date; updatedAt: Date }): boolean {
        return (
            this.workout_id === workout_id &&
            this.user_id === user_id &&
            this.name === name &&
            this.description === description &&
            this.createdAt === createdAt &&
            this.updatedAt === updatedAt
        );
    }
}
