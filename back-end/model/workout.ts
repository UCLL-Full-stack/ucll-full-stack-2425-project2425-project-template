import { User } from './user';
import { WorkoutExercise } from './workoutexercise';
import {
    User as UserPrisma,
    Workout as WorkoutPrisma,
    WorkoutExercise as WorkoutExercisePrisma,
    Exercise as ExercisePrisma,
} from '@prisma/client';

export class Workout {
    readonly id?: string;
    readonly name: string;
    readonly description: string;
    readonly user: User;

    constructor(workout: { id?: string; name: string; description: string; user: User }) {
        this.id = workout.id;
        this.name = workout.name;
        this.description = workout.description;
        this.user = workout.user;
    }

    static from(
        workoutPrisma: WorkoutPrisma & {
            user: UserPrisma;
        }
    ): Workout {
        return new Workout({
            id: workoutPrisma.id,
            name: workoutPrisma.name,
            description: workoutPrisma.description,
            user: User.from(workoutPrisma.user),
        });
    }
}
