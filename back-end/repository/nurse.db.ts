import database from "../util/database"; // Prisma instance for querying
import { Nurse } from "../model/nurse"; // Assuming Nurse model is defined


const getAllNurse = async (): Promise<Nurse[]> => {
    const nursePrisma = await database.nurse.findMany({
        include:{
            user: true,
            pokemon: {include: {stats:true}},
        },
    });

    return nursePrisma.map((nursePrisma) => {
        return Nurse.from({
            ...nursePrisma,
        });
    });
};

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
}: { idPokemon: number }): Promise<Trainer> => {
    // Step 1: Retrieve the Pokémon and its previous trainer
    const pokemon = await database.pokemon.findUnique({
        where: { id: idPokemon },
        include: {
            nurse: true,           // Include nurse association if any
        },
    });

    if (!pokemon) {
        throw new Error(`Pokémon with id ${idPokemon} does not exist.`);
    }

    // Step 2: Check if the Pokémon has a `previousTrainerId`
    if (!pokemon.previousTrainerId) {
        throw new Error(`Pokémon with id ${idPokemon} does not have a previous trainer.`);
    }

    // Step 3: Ensure the Pokémon is assigned to a Nurse
    if (!pokemon.nurseId) {
        throw new Error(`Pokémon with id ${idPokemon} is not currently assigned to any Nurse.`);
    }

    // Step 4: Retrieve the previous trainer using the `previousTrainerId`
    const previousTrainer = await database.trainer.findUnique({
        where: { id: pokemon.previousTrainerId },
        include: {
            pokemon: true, // Include Pokémon for return
        },
    });

    if (!previousTrainer) {
        throw new Error(`Trainer with id ${pokemon.previousTrainerId} does not exist.`);
    }

    // Step 5: Update the Pokémon to assign it to the previous trainer
    await database.pokemon.update({
        where: { id: idPokemon },
        data: {
            trainer: {
                connect: { id: pokemon.previousTrainerId }, // Assign Pokémon to the previous trainer
            },
            previousTrainerId: pokemon.trainerId, // Keep track of the previous trainer ID
        },
    });

    // Step 6: Retrieve the updated trainer object
    const updatedTrainer = await database.trainer.findUnique({
        where: { id: pokemon.previousTrainerId },
        include: {
            user: true,
            pokemon: { include: { stats: true } },
            gymBattles: true,
            badges: true,
        },
    });

    if (!updatedTrainer) {
        throw new Error(`Failed to retrieve updated trainer with id ${pokemon.previousTrainerId}.`);
    }

    // Step 7: Return the updated Trainer object
    return Trainer.from({
        ...updatedTrainer,
        badge: updatedTrainer.badges,
        gymBattle: updatedTrainer.gymBattles,
    });
};









export default { getAllNurse, getNurseByEmail,healPokemon,removePokemonFromNurse,addPokemonToTrainer };
