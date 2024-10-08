import { Workout } from "../workout";

const workouts: Workout[] = [
    new Workout({ workout_id: 1, user_id: 1, name: "Upper body", description: "This workout is upper body focussed", createdAt: new Date(), updatedAt: new Date() }),

    ]

const getAllWorkouts = (): Workout[] => {
    return workouts;
}

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

const createWorkout = ({ workout_id, user_id, name, description, createdAt, updatedAt }: Workout): Workout => {
    const workout = new Workout({ workout_id, user_id, name, description, createdAt, updatedAt });
    workouts.push(workout);
    return workout;
}


export default { getAllWorkouts, getWorkoutById, getWorkoutsByUserId, createWorkout };