import { Workout } from '../model/workout';
import userDb from '../repository/user.db';
import workoutDb from '../repository/workout.db';
import workoutexerciseDb from '../repository/workoutexercise.db';
import { WorkoutInput } from '../types';
import exerciseService from './exercise.service';

const getAllWorkouts = async (): Promise<Workout[]> => {
    const workouts = await workoutDb.getAllWorkouts();
    if (!workouts) {
        throw new Error('No workouts found');
    }
    return workouts;
};

const getWorkoutById = async (id: string): Promise<Workout> => {
    const workout = await workoutDb.getWorkoutById({ id });
    if (!workout) {
        throw new Error(`Workout with ID ${id} not found`);
    }
    return workout;
};

const getWorkoutsByUserId = async (userId: string): Promise<Workout[]> => {
    const user = await userDb.getUserById({ id: userId });
    if (!user) {
        throw new Error(`User with ID ${userId} not found`);
    }
    const userWorkouts = await workoutDb.getWorkoutsByUserId({ userId });
    if (userWorkouts.length === 0) {
        throw new Error(`No workouts found for user with ID ${userId}`);
    }

    return userWorkouts;
};

// const addExerciseToWorkout = (workoutId: number, exerciseId: number): Workout => {
//     const workout = workoutDb.getWorkoutById(workoutId);
//     if (!workout) {
//         throw new Error(`Workout with ID ${workoutId} not found`);
//     }

//     const exercise = exerciseService.getExerciseById(exerciseId);
//     if (!exercise) {
//         throw new Error(`Exercise with ID ${exerciseId} not found`);
//     }

//     const isDuplicate = workout.exercises.some((existingExercise) => existingExercise.id === exerciseId);
//     if (isDuplicate) {
//         throw new Error(`Exercise with ID ${exerciseId} is already added to the workout`);
//     }

//     workoutDb.addExerciseToWorkout(workoutId, exercise);

//     return workout;
// };

// const removeExerciseFromWorkout = (workoutId: number, exerciseId: number): Workout => {
//     const workout = workoutDb.getWorkoutById(workoutId);
//     if (!workout) {
//         throw new Error(`Workout with ID ${workoutId} not found`);
//     }

//     const exerciseIndex = workout.exercises.findIndex((ex) => ex.id === exerciseId);
//     if (exerciseIndex === -1) {
//         throw new Error(`Exercise with ID ${exerciseId} not found in the workout`);
//     }

//     workoutDb.removeExerciseFromWorkout(workoutId, exerciseId);
//     return workout;
// };

// const removeWorkout = (workoutId: number): Workout => {
//     const workout = workoutDb.getWorkoutById(workoutId);
//     if (!workout) {
//         throw new Error(`Workout with ID ${workoutId} not found`);
//     }
//     const success = workoutDb.removeWorkout(workoutId);
//     if (!success) {
//         throw new Error(`Failed to remove workout with ID ${workoutId}`);
//     }
//     return workout;
// };

const createWorkout = async ({
    name,
    description,
    user,
}: WorkoutInput): Promise<Workout> => {
    const workout = new Workout({ name, description, user });
    return workoutDb.createWorkout(workout);
};

export default {
    getAllWorkouts,
    getWorkoutById,
    getWorkoutsByUserId,
    createWorkout,
    // addExerciseToWorkout,
    // removeExerciseFromWorkout,
    // removeWorkout,
};
