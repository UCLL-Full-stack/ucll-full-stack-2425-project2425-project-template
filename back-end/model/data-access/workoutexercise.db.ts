import { WorkoutExercise } from "../workoutexercise";


const workoutexercises: WorkoutExercise[] = [
    new WorkoutExercise({ workout_exercise_id: 1, workout_id: 1, exercise_id: 1, sets: 3, reps: 10, rpe: '7-8', rest_time: '1:00' }),
];

const getAllWorkoutExercises = (): WorkoutExercise[] => {
    return workoutexercises;
}

const getWorkoutExerciseById = (id: number): WorkoutExercise => {
    const workoutexercise = workoutexercises.find((workoutexercise) => workoutexercise.workout_exercise_id === id);
    if (!workoutexercise) {
        throw new Error(`WorkoutExercise with id ${id} not found`);
    }
    return workoutexercise;
};

const getWorkoutExercisesByWorkoutId = (id: number): WorkoutExercise[] => {
    const workoutExercises = workoutexercises.filter((workoutexercise) => workoutexercise.workout_id === id);
    if (workoutExercises.length === 0) {
        throw new Error(`No workout exercises found for workout id ${id}`);
    }
    return workoutExercises;
};

const createWorkoutExercise = ({ workout_exercise_id, workout_id, exercise_id, sets, reps, rpe, rest_time }: WorkoutExercise): WorkoutExercise => {
    const workoutExercise = new WorkoutExercise({ workout_exercise_id, workout_id, exercise_id, sets, reps, rpe, rest_time });
    workoutexercises.push(workoutExercise);
    return workoutExercise;
}

export default { getAllWorkoutExercises, getWorkoutExerciseById, getWorkoutExercisesByWorkoutId, createWorkoutExercise, workoutexercises };

