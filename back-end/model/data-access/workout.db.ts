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

const getWorkoutById = (id: number): Workout => {
    const workout = workouts.find((workout) => workout.workout_id === id);
    if (!workout) {
        throw new Error(`Workout with id ${id} not found`);
    }
    return workout;
};

const getWorkoutsByUserId = (id: number): Workout[] => {
    const userWorkouts = workouts.filter((workout) => workout.user_id === id);
    if (userWorkouts.length === 0) {
        throw new Error(`No workouts found for user id ${id}`);
    }
    return userWorkouts;
};




export default { getAllWorkouts, getWorkoutById, getWorkoutsByUserId, createWorkout, workouts };