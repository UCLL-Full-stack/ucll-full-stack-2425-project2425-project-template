export type Exercise = {
    id: number;
    name: string;
    description: string;
    video_link: string;
    workoutExercise: WorkoutExercise;
}

export type WorkoutExercise = {
    workout_exercise_id: number;
    workout_id: number;
    exercise_id: number;
    sets: number;
    reps: number;
    rpe: string;
    rest_time: string;
}


export type Workout = {
    workout_id: number;
    name: string;
    description: string;
    exercises: Exercise[]
    
}