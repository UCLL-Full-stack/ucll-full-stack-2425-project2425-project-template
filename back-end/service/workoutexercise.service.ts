                import workoutexerciseDb from "../model/data-access/workoutexercise.db"
import { WorkoutExercise } from "../model/workoutexercise";
import { WorkoutExerciseInput } from "../types";

const getAllWorkoutExercises =(): WorkoutExercise[] => {
    const workoutExercises = workoutexerciseDb.getAllWorkoutExercises();
    if (!workoutExercises) {
        throw new Error('No workout exercises found');
    };
    return workoutExercises;
}

const getWorkoutExerciseById = (id: number): WorkoutExercise => {
    const workoutExercise = workoutexerciseDb.getWorkoutExerciseById(id);
    if (!workoutExercise) {
        throw new Error(`Workout exercise with ID ${id} not found`);
    }
    return workoutExercise;
}

const getWorkoutExercisesByWorkoutId = (id: number): WorkoutExercise[] => {
    const workoutExercises = workoutexerciseDb.getWorkoutExercisesByWorkoutId(id);
    if (workoutExercises.length === 0) {
        throw new Error(`No workout exercises found for workout with ID ${id}`);
    }
    return workoutExercises;
}

const createWorkoutExercise = ({ workout_exercise_id, workout_id, exercise_id, sets, reps, rpe, rest_time }: WorkoutExerciseInput): WorkoutExercise => {
    const workoutExercise = new WorkoutExercise({ workout_exercise_id, workout_id, exercise_id, sets, reps, rpe, rest_time });
    return workoutexerciseDb.createWorkoutExercise(workoutExercise);

}

export default { getAllWorkoutExercises, getWorkoutExerciseById, getWorkoutExercisesByWorkoutId, createWorkoutExercise };