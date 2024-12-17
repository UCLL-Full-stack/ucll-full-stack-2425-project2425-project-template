
import { Exercise } from '../model/exercise';
import exerciseDb from '../repository/exercise.db';

const getAllExercises = async (): Promise<Exercise[]> => {
    const exercises = await exerciseDb.getAllExercises();
    if (!exercises) {
        throw new Error('No exercises found');
    }
    return exercises;
};

const getExerciseById = async (id: string): Promise<Exercise | null> => {
    const exercise = await exerciseDb.getExerciseById(id);
    if (!exercise) {
        throw new Error(`Exercise with ID ${id} not found`);
    }
    return exercise;
};



export default { getAllExercises, getExerciseById };
