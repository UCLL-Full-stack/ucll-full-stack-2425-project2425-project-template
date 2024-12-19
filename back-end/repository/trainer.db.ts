import {User} from '../model/user';
import {Trainer} from '../model/trainer';
import {Pokemon} from '../model/pokemon';
import {Badge} from '../model/badge';
import { GymBattle } from '../model/gymBattle';
import database from '../util/database';
import { emit } from 'process';
import { Nurse } from '@prisma/client';

/*const pokemonRed = [
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
*/
const getAllTrainers = async (): Promise<Trainer[]> => {
    const TrainerPrisma = await database.trainer.findMany({
        include: {
            user: true,
            pokemon: { include: { stats: true } }, 
            gymBattles: true, 
            badges: true,
        },
    });

    return TrainerPrisma.map((trainerPrisma) => {
        return Trainer.from({
            ...trainerPrisma,
            badge: trainerPrisma.badges, 
            gymBattle: trainerPrisma.gymBattles, 
        });
    });
};

// In trainer.service.ts (or wherever the service functions are defined)
const getTrainerByEmail = async (email: string): Promise<Trainer | null> => {
    // First, find the user by email
    const user = await database.user.findFirst({
        where: { email },
    });

    if (!user) {
        throw new Error(`User with email ${email} not found.`);
    }

    // Then, find the trainer using the userId
    const trainerPrisma = await database.trainer.findFirst({ // Use findFirst here
        where: {
            userId: user.id, // Use userId to find the trainer
        },
        include: {
            user: true,
            pokemon: {
                include: {
                    stats: true,
                },
            },
            badges: true,
            gymBattles: true,
        },
    });

    if (!trainerPrisma) {
        throw new Error(`Trainer with userId ${user.id} not found.`);
    }

    // Return the transformed trainer object
    return Trainer.from({
        ...trainerPrisma,
        badge: trainerPrisma.badges,
        gymBattle: trainerPrisma.gymBattles,
    });
};

const addPokemonToTrainerById = async ({ id, pokemon }: { id: number, pokemon: Pokemon }): Promise<Trainer | null> => {
    // First, ensure that the trainer exists in the database
    const trainerPrisma = await database.trainer.findUnique({
        where: { id },
        include: {
            pokemon: true, // Include current Pokémon
        },
    });

    if (!trainerPrisma) {
        throw new Error(`Trainer with id ${id} does not exist.`);
    }

    // Create the new Pokemon in the database
    const newPokemon = await database.pokemon.create({
        data: {
            name: pokemon.getName(),
            type: pokemon.getType(),
            health: pokemon.getHealth(),
            canEvolve: pokemon.getCanEvolve(),
            stats: {
                create: {
                    hp: pokemon.getStats().hp,
                    attack: pokemon.getStats().attack,
                    defence: pokemon.getStats().defence,
                    specialAttack: pokemon.getStats().specialAttack,
                    specialDefence: pokemon.getStats().specialDefence,
                    speed: pokemon.getStats().speed,
                },
            },
            trainer: {
                connect: { id }, // Associate this Pokemon with the trainer
            },
        },
        include: { stats: true }, // Include stats when returning the new Pokemon
    });

    // After adding the Pokemon, retrieve the updated trainer with the new Pokemon
    const updatedTrainer = await database.trainer.findUnique({
        where: { id },
        include: {
            user: true,
            pokemon: { include: { stats: true } },
            gymBattles: true,
            badges: true,
        },
    });

    // Return the updated trainer by using the correct shape expected by Trainer.from()
    if (!updatedTrainer) {
        return null;
    }

    // Ensure we provide the correct shape to `Trainer.from`
    const trainerData = {
        id: updatedTrainer.id,
        userId: updatedTrainer.userId, // Ensure userId is included
        user: updatedTrainer.user,
        pokemon: updatedTrainer.pokemon,
        badge: updatedTrainer.badges,
        gymBattle: updatedTrainer.gymBattles,
    };

    return Trainer.from(trainerData); // Pass correctly shaped data to `Trainer.from()`
};

const addBadgeToTrainerById = async({id, badge}: {id:number, badge:Badge}): Promise<Trainer | null> => {
    const trainerPrisma = await database.trainer.findUnique({
        where: { id },
        include: {
            badges: true,
        },
    });

    if (!trainerPrisma) {
        throw new Error(`Trainer with id ${id} does not exist.`);
    }

    const newBadge = await database.badge.create({
        data: {
            name: badge.getName(),
            difficulty: badge.getDifficulty(),
            location: badge.getLocation(),
            trainer: {
                connect: { id },
            },
        },
    });

    const updatedTrainer = await database.trainer.findUnique({
        where: { id },
        include: {
            user: true,
            pokemon: { include: { stats: true } },
            gymBattles: true,
            badges: true,
        },
    });

    if (!updatedTrainer) {
        return null;
    }

    const trainerData = {
        id: updatedTrainer.id,
        userId: updatedTrainer.userId,
        user: updatedTrainer.user,
        pokemon: updatedTrainer.pokemon,
        badge: updatedTrainer.badges,
        gymBattle: updatedTrainer.gymBattles,
    };

    return Trainer.from(trainerData);
}


const removePokemonAndAddToNurse = async ({ idPokemon, idNurse }: { idPokemon: number, idNurse: number }): Promise<Trainer> => {
    // Step 1: Verify if the Pokémon exists
    const pokemon = await database.pokemon.findUnique({
        where: { id: idPokemon },
        include: { trainer: true }, // Include trainer to access the current trainer's ID
    });

    if (!pokemon) {
        throw new Error(`Pokemon with id ${idPokemon} does not exist.`);
    }

    // Check if the Pokémon has an associated trainer
    if (!pokemon.trainer) {
        throw new Error(`Pokemon with id ${idPokemon} is not associated with any trainer.`);
    }

    // Step 2: Verify if the Nurse exists
    const nurse = await database.nurse.findUnique({
        where: { id: idNurse },
        include: { pokemon: true },
    });

    if (!nurse) {
        throw new Error(`Nurse with id ${idNurse} does not exist.`);
    }

    // Step 3: Store the current Trainer's ID in `previousTrainerId`
    await database.pokemon.update({
        where: { id: idPokemon },
        data: {
            previousTrainerId: pokemon.trainer.id, // Save the trainer's ID
            trainer: { disconnect: true }, // Remove the association with the trainer
        },
    });

    // Step 4: Connect the Pokémon to the Nurse
    await database.pokemon.update({
        where: { id: idPokemon },
        data: {
            nurse: {
                connect: { id: idNurse }, // Associate the Pokémon with the Nurse
            },
        },
    });

    // Step 5: Retrieve the updated Trainer (trainer with the Pokémon removed)
    const updatedTrainer = await database.trainer.findUnique({
        where: { id: pokemon.trainer.id }, // Safe now because we checked `trainer` exists
        include: {
            user: true,
            pokemon: { include: { stats: true } },
            gymBattles: true,
            badges: true,
        },
    });

    if (!updatedTrainer) {
        throw new Error(`Trainer with id ${pokemon.trainer.id} not found after update.`);
    }

    // Step 6: Return the updated Trainer object
    return Trainer.from({
        ...updatedTrainer,
        badge: updatedTrainer.badges,
        gymBattle: updatedTrainer.gymBattles,
    });
};






export default {
    getAllTrainers,
    addPokemonToTrainerById,
    addBadgeToTrainerById,
    getTrainerByEmail,
    removePokemonAndAddToNurse,
};