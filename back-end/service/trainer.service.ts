import { PokemonInput } from "../types";
import { Trainer } from "../model/trainer";
import trainerDb from "../repository/trainer.db";
import { Pokemon } from "../model/pokemon";

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

const addPokemonToTrainerById = (id:number,{
    name,
    type,
    stats,
    health,
    canEvolve
}:PokemonInput): Trainer | null => {
    if (name=='') throw new Error('name is required.');
    if (type=='') throw new Error('type is required.')
    if (health <0) throw new Error('health cannot be negative.');
    if (stats.hp <= 0) throw new Error('hp cannot be smaller then or equal to 0.');
    if (stats.attack <= 0) throw new Error('attack cannot be smaller then or equal to 0.');
    if (stats.defence <= 0) throw new Error('defence cannot be smaller then or equal to 0.');
    if (stats.specialAttack <= 0) throw new Error('special attack cannot be smaller then or equal to 0.');
    if (stats.specialDefence <= 0) throw new Error('special defence cannot be smaller then or equal to 0.');
    if (stats.speed <= 0) throw new Error('speed cannot be smaller then or equal to 0.');
    if (stats.hp < health) throw new Error('current health cannot be higher then hp.');

    const pokemon = new Pokemon({name:name,type:type,stats:stats,health:health,canEvolve:canEvolve})
    const trainer = trainerDb.addPokemonToTrainerById({id, pokemon});
    if (!trainer) throw new Error(`Trainer with id ${id} does not exist.`);
    return trainer;
}


export default {
    getAllTrainers,
    getTrainerById,
    getTrainerWithPokemon,
    addPokemonToTrainerById,
};
