
import { Exercise } from '../model/exercise';
import exerciseDb from '../repository/exercise.db';

const getAllExercises = (): Exercise[] => {
    const exercises = exerciseDb.getAllExercises();
    if (!exercises) {
        throw new Error('No exercises found');
    }
    return exercises;
};

const getExerciseById = (id: number): Exercise => {
    const exercise = exerciseDb.getExerciseById(id);
    if (!exercise) {
        throw new Error(`Exercise with ID ${id} not found`);
    }
    return exercise;
};



export default { getAllExercises, getExerciseById };
