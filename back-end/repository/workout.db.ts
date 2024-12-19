import { Exercise } from '../model/exercise';
import { Workout } from '../model/workout';
import { WorkoutExercise } from '../model/workoutexercise';
import { WorkoutInput } from '../types';
import database from '../util/database';

const createWorkout = async ({ name, description, user }: Workout): Promise<Workout> => {
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
            },
            include: {
                user: true,
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
            include: { user: true },
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
            include: { user: true },
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
            include: { user: true },
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
            include: { user: true },
        });
        return workoutPrisma ? Workout.from(workoutPrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllWorkouts,
    getWorkoutById,
    getWorkoutsByUserId,
    createWorkout,
    // workouts,
    // addExerciseToWorkout,
    // removeExerciseFromWorkout,
    removeWorkout,
};
