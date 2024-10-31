import userDb from "../model/data-access/user.db";
import workoutDb from "../model/data-access/workout.db";
import { Workout } from "../model/workout";
import { WorkoutInput } from "../types";
import exerciseService from "./exercise.service";


const getAllWorkouts = (): Workout[] => {
    const workouts = workoutDb.getAllWorkouts();
    return workouts;
}

const getWorkoutById = (id: number): Workout => {
    const workout = workoutDb.getWorkoutById(id)
    if (!workout) {
        throw new Error(`Workout with ID ${id} not found`);
    }
    return workout
}


const getWorkoutsByUserId = (id: number): Workout[] => {
    const user = userDb.getUserById(id);
    if (!user) {
        throw new Error(`User with ID ${id} not found`);
    }
    const userWorkouts = workoutDb.getWorkoutsByUserId(id);
    if (userWorkouts.length === 0) {
        throw new Error(`No workouts found for user with ID ${id}`);
    }

    return userWorkouts;
};

const addExerciseToWorkout = (workoutId: number, exerciseId: number): Workout => {
    const workout = workoutDb.getWorkoutById(workoutId);
    if (!workout) {
        throw new Error(`Workout with ID ${workoutId} not found`);
    }

    const exercise = exerciseService.getExerciseById(exerciseId);
    if (!exercise) {
        throw new Error(`Exercise with ID ${exerciseId} not found`);
    }

    workout.addExercise(exercise); 
    workoutDb.updateWorkout(workout);
    return workout;
};

const createWorkout = ({ workout_id, user_id, name, description,}: WorkoutInput): Workout => {
    const workout = new Workout ({ workout_id, user_id, name, description, exercises: [] });
    return workoutDb.createWorkout(workout);
} 



export default { getAllWorkouts, getWorkoutById, getWorkoutsByUserId, createWorkout, addExerciseToWorkout };
