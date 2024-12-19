import { WorkoutExercise } from './workoutexercise';
import {
    Exercise as ExercisePrisma,
    WorkoutExercise as WorkoutExercisePrisma,
} from '@prisma/client';

export class Exercise {
    readonly id?: string;
    readonly name: string;
    readonly description: string;
    readonly videoLink: string;
    readonly isFavorite?: boolean;

    constructor(exercise: {
        id?: string;
        name: string;
        description: string;
        videoLink: string;
        isFavorite?: boolean;
    }) {
        this.id = exercise.id;
        this.name = exercise.name;
        this.description = exercise.description;
        this.videoLink = exercise.videoLink;
        this.isFavorite = exercise.isFavorite;
    }

    static from(exercisePrisma: ExercisePrisma) {
        return new Exercise({
            id: exercisePrisma.id,
            name: exercisePrisma.name,
            description: exercisePrisma.description,
            videoLink: exercisePrisma.videoLink,
            isFavorite: exercisePrisma.isFavorite,
        });
    }
}
