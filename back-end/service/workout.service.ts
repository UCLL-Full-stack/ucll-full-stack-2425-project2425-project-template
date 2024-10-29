import workoutDb from "../model/data-access/workout.db";
import { Workout } from "../model/workout";
import { WorkoutInput } from "../types";


const getAllWorkouts = (): Workout[] => {
    const workouts = workoutDb.getAllWorkouts();
    return workouts;
}

const getWorkoutById = (id: number): Workout => {
    const workout = workoutDb.getWorkoutById(id)
    return workout
}

const getWorkoutsByUserId = (id: number): Workout[] => {
    const userWorkouts = workoutDb.getWorkoutsByUserId(id);
    return userWorkouts;
}


const createWorkout = ({ workout_id, user_id, name, description,}: WorkoutInput): Workout => {
    const workout = new Workout ({ workout_id, user_id, name, description, exercises: [] });
    return workoutDb.createWorkout(workout);
} 



export default { getAllWorkouts, getWorkoutById, getWorkoutsByUserId, createWorkout };
