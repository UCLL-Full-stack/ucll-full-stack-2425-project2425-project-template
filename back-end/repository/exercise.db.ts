import { Exercise } from '../model/exercise';
import { WorkoutExercise } from '../model/workoutexercise';
import database from '../util/database';

const getAllExercises = async (): Promise<Exercise[]> => {
    try {
        const exercisesPrisma = await database.exercise.findMany();
        return exercisesPrisma.map((exercise) => Exercise.from(exercise));
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const getExerciseById = async ({ id }: { id: string }): Promise<Exercise | null> => {
    try {
        const exercisePrisma = await database.exercise.findUnique({
            where: { id },
        });
        return exercisePrisma ? Exercise.from(exercisePrisma) : null;
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

const createExercise = async ({ name, description, videoLink }: Exercise): Promise<Exercise> => {
    try {
        const exercisePrisma = await database.exercise.create({
            data: {
                name: name,
                description: description,
                videoLink: videoLink,
            },
        });
        return Exercise.from(exercisePrisma);
    } catch (error) {
        console.error(error);
        throw new Error('Database error. See server log for details.');
    }
};

export default { getAllExercises, getExerciseById, createExercise };
