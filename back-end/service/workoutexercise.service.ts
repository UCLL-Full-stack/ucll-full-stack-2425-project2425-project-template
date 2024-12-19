import { WorkoutExercise } from '../model/workoutexercise';
import exerciseDb from '../repository/exercise.db';
import workoutDb from '../repository/workout.db';
import workoutexerciseDb from '../repository/workoutexercise.db';
import { WorkoutExerciseInput } from '../types';

const getAllWorkoutExercises = async (): Promise<WorkoutExercise[]> => {
    const workoutExercises = await workoutexerciseDb.getAllWorkoutExercises();
    if (!workoutExercises) {
        throw new Error('No workout exercises found');
    }
    return workoutExercises;
};

const getWorkoutExerciseById = async (id: string): Promise<WorkoutExercise> => {
    const workoutExercise = await workoutexerciseDb.getWorkoutExerciseById({ id });
    if (!workoutExercise) {
        throw new Error(`Workout exercise with ID ${id} not found`);
    }
    return workoutExercise;
};

const getWorkoutExercisesByWorkoutId = async (workoutId: string): Promise<WorkoutExercise[]> => {
    const workoutExercises = await workoutexerciseDb.getWorkoutExercisesByWorkoutId({ workoutId });
    if (workoutExercises.length === 0) {
        throw new Error(`No workout exercises found for workout with ID ${workoutId}`);
    }
    return workoutExercises;
};

// const createWorkoutExercise = async ({
//     id,
//     sets,
//     reps,
//     rpe,
//     restTime,
//     workout,
//     exercise,
// }: WorkoutExerciseInput): Promise<WorkoutExercise> => {
//     const workoutExercise = new WorkoutExercise({
//         id,
//         workout,
//         exercise,
//         sets,
//         reps,
//         rpe,
//         restTime,
//     });
//     return workoutexerciseDb.createWorkoutExercise(workoutExercise);
// };

export default {
    getAllWorkoutExercises,
    getWorkoutExerciseById,
    getWorkoutExercisesByWorkoutId,
    // createWorkoutExercise,
};
