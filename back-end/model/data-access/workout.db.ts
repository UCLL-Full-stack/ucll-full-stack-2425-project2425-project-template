import { Workout } from "../workout";

const workouts: Workout[] = []


const createWorkout = ({ workout_id, user_id, name, description}: Workout): Workout => {
    const workout = new Workout({
        workout_id,
        user_id,
        name,
        description,
        exercises: [],
    })
    workouts.push(workout)
    return workout
}


const getAllWorkouts = (): Workout[] => workouts

const getWorkoutById = (id: number): Workout | undefined => {
    const workout = workouts.find((workout) => workout.workout_id === id);
    return workout;
};


const getWorkoutsByUserId = (id: number): Workout[] => {
    return workouts.filter((workout) => workout.user_id === id) || [];
};




export default { getAllWorkouts, getWorkoutById, getWorkoutsByUserId, createWorkout, workouts };