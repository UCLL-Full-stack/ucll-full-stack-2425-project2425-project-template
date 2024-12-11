import { Exercise as ExercisePrisma } from '@prisma/client';
import { WorkoutExercise as WorkoutExercisePrisma } from '@prisma/client';
import { WorkoutExercise } from './workoutexercise';

export class Exercise {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly videoUrl: string;
    readonly workoutExercise: WorkoutExercise;

    constructor(exercise: {
        id: number;
        name: string;
        description: string;
        videoUrl: string;
        workoutExercise: WorkoutExercise;
    }) {
        this.validate(exercise);
        this.id = exercise.id;
        this.name = exercise.name;
        this.description = exercise.description;
        this.videoUrl = exercise.videoUrl;
        this.workoutExercise = exercise.workoutExercise;
    }
    validate(exercise: { id: number; name: string; description: string; videoUrl: string }) {
        const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/; // AI generated regex for URL validation
        if (typeof exercise.videoUrl !== 'string' || !urlRegex.test(exercise.videoUrl)) {
            throw new Error('Invalid Video Link: Must be a valid URL');
        }
    }

    equals({
        id,
        name,
        description,
        videoUrl,
        workoutExercise,
    }: {
        id: number;
        name: string;
        description: string;
        videoUrl: string;
        workoutExercise: WorkoutExercise;
    }): boolean {
        return (
            this.id === id &&
            this.name === name &&
            this.description === description &&
            this.videoUrl === videoUrl &&
            this.workoutExercise === workoutExercise
        );
    }

    static from({
        id,
        name,
        description,
        videoUrl,
        workoutExercise,
    }: ExercisePrisma & { workoutExercise: WorkoutExercisePrisma }) {
        return new Exercise({
            id,
            name,
            description,
            videoUrl,
            workoutExercise: WorkoutExercise.from(workoutExercise),
        });
    }
}
