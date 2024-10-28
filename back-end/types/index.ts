type workoutInput = {
    workout_id: number;
    user_id: number;
    name: string;
    description: string;
}

type workoutExerciseInput = {
    workout_exercise_id: number;
    workout_id: number;
    exercise_id: number;
    sets: number;
    reps: number;
    rpe: string;
    rest_time: string;
}

export { workoutInput, workoutExerciseInput };