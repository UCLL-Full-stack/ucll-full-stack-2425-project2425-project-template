import { WorkoutExercise } from '../model/workoutexercise';
import database from '../util/database';

// const workoutexercises: WorkoutExercise[] = [
//     new WorkoutExercise({ workout_exercise_id: 1, workout_id: 1, exercise_id: 1, sets: 3, reps: 10, rpe: '7-8', rest_time: '1:00' }),
// ];

const getAllWorkoutExercises = async (): Promise<WorkoutExercise[]> => {
    try {
        const workoutExercisePrisma = await database.workoutExercise.findMany();
        return workoutExercisePrisma.map((workoutExercise) =>
            WorkoutExercise.from(workoutExercise)
        );
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getWorkoutExerciseById = async (id: string): Promise<WorkoutExercise | null> => {
    try {
        const workoutExercisePrisma = await database.workoutExercise.findUnique({
            where: {
                id: id,
            },
        });
        return workoutExercisePrisma ? WorkoutExercise.from(workoutExercisePrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getWorkoutExercisesByWorkoutId = async (id: string): Promise<WorkoutExercise[]> => {
    try {
        const workoutExercisePrisma = await database.workoutExercise.findMany({
            where: {
                workoutId: id,
            },
        });
        return workoutExercisePrisma.map((workoutExercise) =>
            WorkoutExercise.from(workoutExercise)
        );
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

// const createWorkoutExercise = async ({
//     workoutId,
//     exerciseId,
//     sets,
//     reps,
//     rpe,
//     restTime,
// }: WorkoutExercise): Promise<WorkoutExercise> => {
//     try {
//         const workoutExercisePrisma = await database.workoutExercise.create({
//             data: { workoutId, exerciseId, sets, reps, rpe, restTime },
//         });
//         return WorkoutExercise.from(workoutExercisePrisma);
//     } catch (error) {
//         console.error(error);
//         throw new Error('Database error. See server log for details.');
//     }
// };

export default {
    getAllWorkoutExercises,
    getWorkoutExerciseById,
    getWorkoutExercisesByWorkoutId,
    // createWorkoutExercise,
};
