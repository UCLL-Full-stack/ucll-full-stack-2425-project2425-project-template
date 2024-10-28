import workoutexerciseDb from "../model/data-access/workoutexercise.db"
import { WorkoutExercise } from "../model/workoutexercise";
import { workoutExerciseInput } from "../types";

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

const createWorkoutExercise = (workoutExerciseInput: workoutExerciseInput): WorkoutExercise => {
    try {
        return new WorkoutExercise(workoutExerciseInput);
    } catch (error: any) {
        console.error("Error in createWorkoutExercise:", error.message); 
        throw new Error(error.message); 
    }
};

export default { getAllWorkoutExercises, getWorkoutExerciseById, getWorkoutExercisesByWorkoutId, createWorkoutExercise };