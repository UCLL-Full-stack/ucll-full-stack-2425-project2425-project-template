import workoutexerciseDb from "../model/data-access/workoutexercise.db"
import { WorkoutExercise } from "../model/workoutexercise";

const getAllWorkoutExercises =(): WorkoutExercise[] => {
    const workoutExercises = workoutexerciseDb.getAllWorkoutExercises();
    return workoutExercises;
}

const getWorkoutExerciseById = (id: number): WorkoutExercise => {
    const workoutExercise = workoutexerciseDb.getWorkoutExerciseById(id);
    return workoutExercise;
}

const getWorkoutExercisesByWorkoutId = (id: number): WorkoutExercise[] => {
    const workoutExercises = workoutexerciseDb.getWorkoutExercisesByWorkoutId(id);
    return workoutExercises;
}

export default { getAllWorkoutExercises, getWorkoutExerciseById, getWorkoutExercisesByWorkoutId };