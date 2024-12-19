import { Workout } from '../model/workout';
import exerciseDb from '../repository/exercise.db';
import userDb from '../repository/user.db';
import workoutDb from '../repository/workout.db';
import { WorkoutInput } from '../types';

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

const addExerciseToWorkout = async (workoutId: string, exerciseId: string): Promise<Workout> => {
    const workout = await workoutDb.getWorkoutById({ id: workoutId });
    if (!workout) {
        throw new Error(`Workout with ID ${workoutId} not found`);
    }

    const exercise = await exerciseDb.getExerciseById({ id: exerciseId });
    if (!exercise) {
        throw new Error(`Exercise with ID ${exerciseId} not found`);
    }

    workoutDb.addExerciseToWorkout(workoutId, exerciseId);
    return workout;
};

const removeExerciseFromWorkout = async (
    workoutId: string,
    exerciseId: string
): Promise<Workout> => {
    const workout = await workoutDb.getWorkoutById({ id: workoutId });
    if (!workout) {
        throw new Error(`Workout with ID ${workoutId} not found`);
    }

    const exercise = await exerciseDb.getExerciseById({ id: exerciseId });
    if (!exercise) {
        throw new Error(`Exercise with ID ${exerciseId} not found`);
    }

    workoutDb.removeExerciseFromWorkout(workoutId, exerciseId);
    return workout;
};

const removeWorkout = async (id: string): Promise<Workout> => {
    const workout = await workoutDb.getWorkoutById({ id });
    if (!workout) {
        throw new Error(`Workout with ID ${id} not found`);
    }

    await workoutDb.removeWorkout({ id });
    return workout;
};

const createWorkout = async ({
    name,
    description,
    user,
    exercises,
}: WorkoutInput): Promise<Workout> => {
    const workout = new Workout({ name, description, user, exercises });
    return workoutDb.createWorkout(workout);
};

export default {
    getAllWorkouts,
    getWorkoutById,
    getWorkoutsByUserId,
    createWorkout,
    addExerciseToWorkout,
    removeExerciseFromWorkout,
    removeWorkout,
};
