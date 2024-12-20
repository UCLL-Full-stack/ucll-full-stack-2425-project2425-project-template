import { Exercise } from '../model/exercise';
import exerciseDb from '../repository/exercise.db';
import { ExerciseInput } from '../types';

const getAllExercises = async (): Promise<Exercise[]> => {
    const exercises = await exerciseDb.getAllExercises();
    if (!exercises) {
        throw new Error('No exercises found');
    }
    return exercises;
};

const getExerciseById = async (id: string): Promise<Exercise | null> => {
    const exercise = await exerciseDb.getExerciseById({ id });
    if (!exercise) {
        throw new Error(`Exercise with ID ${id} not found`);
    }
    return exercise;
};

const toggleFavorite = async (id: string): Promise<Exercise | null> => {
    const exercise = await exerciseDb.getExerciseById({ id });
    if (!exercise) {
        throw new Error(`Exercise with ID ${id} not found`);
    }
    return await exerciseDb.toggleFavorite({ id });
};

const createExercise = async ({
    name,
    description,
    videoLink,
}: ExerciseInput): Promise<Exercise> => {

    const exercise = new Exercise({ name, description, videoLink });
    return await exerciseDb.createExercise(exercise);
};

export default { getAllExercises, getExerciseById, createExercise, toggleFavorite };
