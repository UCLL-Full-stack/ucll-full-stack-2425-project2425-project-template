import {User} from '../model/user';
import {Trainer} from '../model/trainer';
import {Pokemon} from '../model/pokemon';
import {Badge} from '../model/badge';
import { GymBattle } from '../model/gymBattle';

const pokemonRed = [
    new Pokemon({
        id:1,
        name:"pikachu",
        type: "electric",
        stats: {hp:40,attack:74,defence:50,specialAttack:80,specialDefence:64,speed:80},
        health: 38,
        canEvolve: true,
    }),
    new Pokemon({
        id:2,
        name:"Charizard",
        type: "fire/flying",
        stats: {hp:200,attack:150,defence:120,specialAttack:140,specialDefence:140,speed:60},
        health: 200,
        canEvolve: false,
    }),
];

const pokemonBlue = [
    new Pokemon({
        id:3,
        name:"rattata",
        type: "normal",
        stats: {hp:50,attack:55,defence:40,specialAttack:30,specialDefence:24,speed:75},
        health: 50,
        canEvolve: true,
    }),
    new Pokemon({
        id:4,
        name:"Blastoise",
        type: "water",
        stats: {hp:250,attack:140,defence:130,specialAttack:100,specialDefence:150,speed:65},
        health: 250,
        canEvolve: false,
    }),
];

const badgesRed = [
    new Badge({
        name:"Boulder badge",
        location:"Pewter city",
        difficulty: 1
    }),
];

const badgesBlue = [
    new Badge({
        name:"Boulder badge",
        location:"Pewter city",
        difficulty: 1
    }),
    new Badge({
        name:"Cascade badge",
        location:"Cerulian city",
        difficulty: 1.5
    }),
];

const trainers = [
    new Trainer({
        id:1,
        user: new User({
            id:1,
            firstName: "Red",
            lastName: 'pokemon',
            email: 'red@gmail.com',
            password: 'GonnaBeTheBest151',
            role: 'trainer'
        }),
        pokemon: pokemonRed,
        badges: badgesRed,
        gymBattles: [],
    }),
    new Trainer({
        id:2,
        user: new User({
            id:2,
            firstName: "Blue",
            lastName: 'pokemon',
            email: 'blue@gmail.com',
            password: 'Sm3llY4L4ter',
            role: 'trainer'
        }),
        pokemon: pokemonBlue,
        badges: badgesBlue,
        gymBattles: [],
    })
];

const getAllTrainers = (): Trainer[] =>trainers;

const getTrainerById = ({id}: {id:number}): Trainer | null =>{
    return trainers.find((trainer) => trainer.getId() ===id) || null;
};

const addPokemonToTrainerById = ({id, pokemon}: {id:number, pokemon:Pokemon}): Trainer | null => {
    trainers.find((trainer) => trainer.getId() ===id)?.addPokemon(pokemon);
    return trainers.find((trainer) => trainer.getId() ===id) || null;
}

export default {
    getAllTrainers,
    getTrainerById,
    addPokemonToTrainerById,
};