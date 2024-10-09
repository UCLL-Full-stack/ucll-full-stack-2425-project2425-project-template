import workoutDb from "../model/data-access/workout.db";
import { Workout } from "../model/workout";
import { workoutInput } from "../types";


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


const createWorkout = async (workoutInput: workoutInput) => {
    const newWorkout = new Workout(workoutInput)
    workoutDb.workouts.push(newWorkout)
    return newWorkout
}



export default { getAllWorkouts, getWorkoutById, getWorkoutsByUserId, createWorkout };
