import { Trainer } from "../model/trainer";
import trainerDb from "../repository/trainer.db";

const getAllTrainers = (): Trainer[] => trainerDb.getAllTrainers();

const getTrainerById = (id: number): Trainer => {
    const trainer = trainerDb.getTrainerById({id});
    if (!trainer) throw new Error(`Trainer with id ${id} does not exist.`);
    return trainer
};

const getTrainerWithPokemon = (id: number): Trainer | null => {
    const trainer = trainerDb.getTrainerById({ id });
    if (!trainer) throw new Error(`Trainer with id ${id} does not exist.`);
    return trainer;
};

export default {
    getAllTrainers,
    getTrainerById,
    getTrainerWithPokemon,
};
