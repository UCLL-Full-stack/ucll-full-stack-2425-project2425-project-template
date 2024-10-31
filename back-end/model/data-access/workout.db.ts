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

const updateWorkout = (workout: Workout): void => {
    const index = workouts.findIndex(w => w.workout_id === workout.workout_id);
    if (index !== -1) {
        workouts[index] = workout;
    } else {
        throw new Error(`Workout with ID ${workout.workout_id} not found`);
    }
};


const getAllWorkouts = (): Workout[] => workouts

const getWorkoutById = (id: number): Workout | undefined => {
    const workout = workouts.find((workout) => workout.workout_id === id);
    return workout;
};


const getWorkoutsByUserId = (id: number): Workout[] => {
    return workouts.filter((workout) => workout.user_id === id) || [];
};




export default { getAllWorkouts,  getWorkoutById, getWorkoutsByUserId, createWorkout, workouts, updateWorkout };