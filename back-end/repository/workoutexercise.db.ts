import { WorkoutExercise } from '../model/workoutexercise';
import database from '../util/database';

const getAllWorkoutExercises = async (): Promise<WorkoutExercise[]> => {
    try {
        const workoutExercisePrisma = await database.workoutExercise.findMany({
            include: { workout: { include: { user: true } }, exercise: true },
        });
        return workoutExercisePrisma.map((workoutExercise) =>
            WorkoutExercise.from(workoutExercise)
        );
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getWorkoutExerciseById = async ({ id }: { id: string }): Promise<WorkoutExercise | null> => {
    try {
        const workoutExercisePrisma = await database.workoutExercise.findUnique({
            where: { id },
            include: { workout: { include: { user: true } }, exercise: true },
        });
        return workoutExercisePrisma ? WorkoutExercise.from(workoutExercisePrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getWorkoutExercisesByWorkoutId = async ({
    workoutId,
}: {
    workoutId: string;
}): Promise<WorkoutExercise[]> => {
    try {
        const workoutExercisePrisma = await database.workoutExercise.findMany({
            where: { workoutId },
            include: { workout: { include: { user: true } }, exercise: true },
        });
        return workoutExercisePrisma.map((workoutExercise) =>
            WorkoutExercise.from(workoutExercise)
        );
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createWorkoutExercise = async ({
    sets,
    reps,
    rpe,
    restTime,
    workout,
    exercise,
}: WorkoutExercise): Promise<WorkoutExercise> => {
    try {
        const workoutExercisePrisma = await database.workoutExercise.create({
            data: {
                sets,
                reps,
                rpe,
                restTime,
                workout: { connect: { id: workout.id } },
                exercise: { connect: { id: exercise.id } },
            },
            include: { workout: { include: { user: true } }, exercise: true },
        });
        return WorkoutExercise.from(workoutExercisePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default {
    getAllWorkoutExercises,
    getWorkoutExerciseById,
    getWorkoutExercisesByWorkoutId,
    createWorkoutExercise,
};
