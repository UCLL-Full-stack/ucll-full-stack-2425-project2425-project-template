import { Exercise } from './exercise';
import { User } from './user';
import {
    User as UserPrisma,
    Workout as WorkoutPrisma,
    Exercise as ExercisePrisma,
} from '@prisma/client';

export class Workout {
    readonly id?: string;
    readonly name: string;
    readonly description: string;
    readonly user: User;
    readonly exercises: Exercise[] = [];

    constructor(workout: {
        id?: string;
        name: string;
        description: string;
        user: User;
        exercises: Exercise[];
    }) {
        this.id = workout.id;
        this.name = workout.name;
        this.description = workout.description;
        this.user = workout.user;
        this.exercises = workout.exercises;
    }

    static from({
        id,
        name,
        description,
        user,
        exercises,
    }: WorkoutPrisma & { user: UserPrisma; exercises: ExercisePrisma[] }): Workout {
        return new Workout({
            id,
            name,
            description,
            user: User.from(user),
            exercises: exercises.map((exercise) => Exercise.from(exercise)),
        });
    }
}
