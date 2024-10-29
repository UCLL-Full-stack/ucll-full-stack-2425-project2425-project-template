
import { WorkoutExercise } from "./workoutexercise";

export class Exercise {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly video_link: string;
    readonly workoutExercise: WorkoutExercise;

    constructor(exercise: { id: number; name: string; description: string; video_link: string, workoutExercise: WorkoutExercise }) {
        this.validate(exercise);
        this.id = exercise.id;
        this.name = exercise.name;
        this.description = exercise.description;
        this.video_link = exercise.video_link;
        this.workoutExercise = exercise.workoutExercise;
    }
    validate(exercise: { id: number; name: string; description: string; video_link: string; }) {
        const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/; // AI generated regex for URL validation
        if (typeof exercise.video_link !== 'string' || !urlRegex.test(exercise.video_link)) {
            throw new Error("Invalid Video Link: Must be a valid URL");
        }

    }

    equals({ id, name, description, video_link, workoutExercise }: { id: number; name: string; description: string; video_link: string; workoutExercise: WorkoutExercise }): boolean {
        return (
            this.id === id &&
            this.name === name &&
            this.description === description &&
            this.video_link === video_link &&
            this.workoutExercise === workoutExercise
        );
    }
}



