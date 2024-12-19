import database from "../util/database"; // Prisma instance for querying
import { Nurse } from "../model/nurse"; // Assuming Nurse model is defined


const getNurseByEmail = async (email: string): Promise<Nurse | null> => {
    // First, find the user by email
    const user = await database.user.findFirst({
        where: { email },
    });

    if (!user) {
        throw new Error(`User with email${email} not found.`);
    }

    // Then, find the trainer using the userId
    const nursePrisma = await database.nurse.findFirst({ // Use findFirst here
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
        },
    });

    if (!nursePrisma) {
        throw new Error(`nurse with userId ${user.id} not found.`);
    }

    // Return the transformed trainer object
    return Nurse.from({
        ...nursePrisma,
        
    });
};

import { Pokemon } from "../model/pokemon";
import { Trainer } from "../model/trainer";


const healPokemon = async (id: number): Promise<Pokemon> => {
    // Fetch the Pokémon and its associated stats from the database
    const pokemonWithStats = await database.pokemon.findUnique({
        where: {
            id,
        },
        include: {
            stats: true, // Include the stats relation to get hp, attack, etc.
        },
    });

    // Check if the Pokémon exists
    if (!pokemonWithStats) {
        throw new Error(`Pokemon with ID ${id} not found.`);
    }

    // Use the `hp` from stats to set the health
    const healedPokemon = Pokemon.from(pokemonWithStats, pokemonWithStats.stats);

    // Set the health to the hp stat
    const newHealth = pokemonWithStats.stats.hp;

    // Update the Pokémon's health in the database
    await database.pokemon.update({
        where: { id },
        data: {
            health: newHealth,
        },
    });

    // Return the updated Pokémon object with health set to hp
    return new Pokemon({
        id: healedPokemon.getId(),
        name: healedPokemon.getName(),
        type: healedPokemon.getType(),
        stats: healedPokemon.getStats(),
        health: newHealth, // Updated health value
        canEvolve: healedPokemon.getCanEvolve(),
    });
};

const removePokemonFromNurse = async ({
    idPokemon,
}: { idPokemon: number }): Promise<Pokemon> => {
    // Step 1: Verify if the Pokémon exists and is currently assigned to a nurse
    const pokemon = await database.pokemon.findUnique({
        where: { id: idPokemon },
        include: { nurse: true }, // Verify the current nurse association
    });

    if (!pokemon) {
        throw new Error(`Pokemon with id ${idPokemon} does not exist.`);
    }

    if (!pokemon.nurse) {
        throw new Error(`Pokemon with id ${idPokemon} is not assigned to any nurse.`);
    }

    // Step 2: Disconnect the Pokémon from the current Nurse using the "disconnect" method
    await database.pokemon.update({
        where: { id: idPokemon },
        data: {
            nurse: { disconnect: true }, // Use the "disconnect" operation to remove the nurse
        },
    });

    // Step 3: Manually re-map or re-fetch the updated Pokémon with the appropriate type
    const updatedPokemon = await database.pokemon.findUnique({
        where: { id: idPokemon },
        include: { nurse: true, stats: true }, // Re-fetch all necessary related data
    });

    // Assuming you have a class `Pokemon` that has methods like `getId()`
    if (!updatedPokemon) {
        throw new Error(`Pokemon with id ${idPokemon} could not be found after update.`);
    }

    // Create a new instance of your Pokemon class (if necessary)
    return new Pokemon(updatedPokemon); // Assuming `Pokemon` is a class and has a constructor
};


const addPokemonToTrainer = async ({
    idPokemon,
    idTrainer,
}: { idPokemon: number; idTrainer: number }): Promise<Trainer> => {
    // Step 1: Verify if the Trainer exists
    const trainer = await database.trainer.findUnique({
        where: { id: idTrainer },
        include: {
            pokemon: true, // Include Pokémon for return
        },
    });

    if (!trainer) {
        throw new Error(`Trainer with id ${idTrainer} does not exist.`);
    }

    // Step 2: Check if the Pokémon is currently assigned to a Nurse
    const pokemon = await database.pokemon.findUnique({
        where: { id: idPokemon },
        include: {
            nurse: true, // Include nurse association if any
        },
    });

    if (!pokemon) {
        throw new Error(`Pokémon with id ${idPokemon} does not exist.`);
    }

    // Check if the Pokémon is assigned to a Nurse
    if (pokemon.nurseId) {
        // If the Pokémon is already associated with a Nurse, proceed to add it to the Trainer
        await database.pokemon.update({
            where: { id: idPokemon },
            data: {
                trainer: {
                    connect: { id: idTrainer }, // Associate Pokémon with the trainer
                },
                previousTrainerId: pokemon.trainerId, // Save the current trainer ID if moving
            },
        });
    } else {
        throw new Error(`Pokémon with id ${idPokemon} is not currently assigned to any Nurse.`);
    }

    // Step 3: Retrieve the updated Trainer object
    const updatedTrainer = await database.trainer.findUnique({
        where: { id: idTrainer },
        include: {
            user: true,
            pokemon: { include: { stats: true } },
            gymBattles: true,
            badges: true,
        },
    });

    if (!updatedTrainer) {
        throw new Error(`Failed to retrieve updated trainer with id ${idTrainer}.`);
    }

    // Step 4: Return the updated Trainer object
    return Trainer.from({
        ...updatedTrainer,
        badge: updatedTrainer.badges,
        gymBattle: updatedTrainer.gymBattles,
    });
};






export default { getNurseByEmail,healPokemon,removePokemonFromNurse,addPokemonToTrainer };
