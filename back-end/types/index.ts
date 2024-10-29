type ExerciseInput = {
    id?: number;
    name?: string;
    description?: string;
    video_link?: string;
    workoutExercise?: WorkoutExerciseInput;
}

type UserInput = {
    user_id?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
}

type WorkoutInput = {
    workout_id: number;
    user_id: number;
    name: string;
    description: string;
    exercises: ExerciseInput[];
}

type WorkoutExerciseInput = {
    workout_exercise_id: number;
    workout_id: number;
    exercise_id: number;
    sets: number;
    reps: number;
    rpe: string;
    rest_time: string;
}

export { ExerciseInput, UserInput, WorkoutInput, WorkoutExerciseInput };