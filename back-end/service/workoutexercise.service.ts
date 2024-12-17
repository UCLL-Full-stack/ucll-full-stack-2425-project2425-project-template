
import { WorkoutExercise } from '../model/workoutexercise';
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
    const workoutExercise = await workoutexerciseDb.getWorkoutExerciseById(id);
    if (!workoutExercise) {
        throw new Error(`Workout exercise with ID ${id} not found`);
    }
    return workoutExercise;
};

const getWorkoutExercisesByWorkoutId = async (id: string): Promise<WorkoutExercise[]> => {
    const workoutExercises = await workoutexerciseDb.getWorkoutExercisesByWorkoutId(id);
    if (workoutExercises.length === 0) {
        throw new Error(`No workout exercises found for workout with ID ${id}`);
    }
    return workoutExercises;
};

// const createWorkoutExercise = ({
//     workout_exercise_id,
//     workout_id,
//     exercise_id,
//     sets,
//     reps,
//     rpe,
//     rest_time,
// }: WorkoutExerciseInput): WorkoutExercise => {
//     const existingExercise = workoutexerciseDb.getWorkoutExerciseById(workout_exercise_id);

//     if (existingExercise) {
//         throw new Error(`Workout exercise with ID ${workout_exercise_id} already exists`);
//     }

//     const duplicateExercise = workoutexerciseDb
//         .getWorkoutExercisesByWorkoutId(workout_id)
//         .find((exercise) => exercise.exercise_id === exercise_id);

//     if (duplicateExercise) {
//         throw new Error(
//             `Workout exercise with workout ID ${workout_id} and exercise ID ${exercise_id} already exists`
//         );
//     }

//     const workoutExercise = new WorkoutExercise({
//         workout_exercise_id,
//         workout_id,
//         exercise_id,
//         sets,
//         reps,
//         rpe,
//         rest_time,
//     });
//     return workoutexerciseDb.createWorkoutExercise(workoutExercise);
// };

export default {
    getAllWorkoutExercises,
    getWorkoutExerciseById,
    getWorkoutExercisesByWorkoutId,
    // createWorkoutExercise,
};
