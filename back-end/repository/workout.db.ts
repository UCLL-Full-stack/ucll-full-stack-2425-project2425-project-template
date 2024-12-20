import { Exercise } from '../model/exercise';
import { Workout } from '../model/workout';
import { WorkoutInput } from '../types';
import database from '../util/database';

const createWorkout = async ({ name, description, user, exercises }: Workout): Promise<Workout> => {
    try {
        const workoutPrisma = await database.workout.create({
            data: {
                name: name,
                description: description,
                user: {
                    connect: {
                        email: user.email,
                    },
                },
                exercises: {
                    connect: exercises.map((exercise) => ({ id: exercise.id })),
                },
            },
            include: {
                user: true,
                exercises: true,
            },
        });
        return Workout.from(workoutPrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

// const removeExerciseFromWorkout = (workoutId: number, exerciseId: number): Workout | undefined => {
//     const workout = workouts.find((w) => w.workout_id === workoutId);

//     if (workout) {
//         workout.removeExercise(exerciseId);
//     }

//     return workout;
// };

const getAllWorkouts = async (): Promise<Workout[]> => {
    try {
        const workoutPrisma = await database.workout.findMany({
            include: { user: true, exercises: true },
        });
        return workoutPrisma.map((workout) => Workout.from(workout));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getWorkoutById = async ({ id }: { id: string }): Promise<Workout | null> => {
    try {
        const workoutPrisma = await database.workout.findUnique({
            where: { id },
            include: { user: true, exercises: true },
        });
        return workoutPrisma ? Workout.from(workoutPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getWorkoutsByUserId = async ({ userId }: { userId: string }): Promise<Workout[]> => {
    try {
        const workoutPrisma = await database.workout.findMany({
            where: { userId },
            include: { user: true, exercises: true },
        });
        return workoutPrisma.map((workout) => Workout.from(workout));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const removeWorkout = async ({ id }: { id: string }): Promise<Workout | null> => {
    try {
        const workoutPrisma = await database.workout.delete({
            where: { id },
            include: { user: true, exercises: true },
        });
        return workoutPrisma ? Workout.from(workoutPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const addExerciseToWorkout = async (
    workoutId: string,
    exerciseId: string
): Promise<Workout | null> => {
    try {
        const workoutPrisma = await database.workout.update({
            where: { id: workoutId },
            data: {
                exercises: {
                    connect: { id: exerciseId },
                },
            },
            include: { user: true, exercises: true },
        });
        return workoutPrisma ? Workout.from(workoutPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const removeExerciseFromWorkout = async (
    workoutId: string,
    exerciseId: string
): Promise<Workout | null> => {
    try {
        const workoutPrisma = await database.workout.update({
            where: { id: workoutId },
            data: {
                exercises: {
                    disconnect: { id: exerciseId },
                },
            },
            include: { user: true, exercises: true },
        });
        return workoutPrisma ? Workout.from(workoutPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const updateWorkout = async (workout: Workout): Promise<Workout | null> => {
    try {
        const workoutPrisma = await database.workout.update({
            where: { id: workout.id },
            data: {
                name: workout.name,
                description: workout.description,
                user: {
                    connect: {
                        email: workout.user.email,
                    },
                },
                exercises: {
                    connect: workout.exercises.map((exercise) => ({ id: exercise.id })),
                },
            },
            include: { user: true, exercises: true },
        });
        return workoutPrisma ? Workout.from(workoutPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const assignWorkoutToUser = async (workoutId: string, userId: string): Promise<void> => {
    try {
      await database.workout.update({
        where: { id: workoutId },
        data: { userId },
      });
    } catch (error) {
      console.error('Error assigning workout to user:', error);
      throw new Error('Failed to assign workout to user.');
    }
  };

export default {
    getAllWorkouts,
    getWorkoutById,
    getWorkoutsByUserId,
    createWorkout,
    addExerciseToWorkout,
    removeExerciseFromWorkout,
    removeWorkout,
    updateWorkout,
    assignWorkoutToUser,
};
