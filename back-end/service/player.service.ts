import playerDb from "../repository/player.db"
import { Player } from "../model/player";
import { PlayerInput } from "../types/types";

const getAllPlayers = async (): Promise<Player[]> => {
    return playerDb.findAll();
}

const getPlayerById = async (id: number): Promise<Player | undefined> => {
    const player = await playerDb.findById(id);
    if (!player) {
        throw new Error(`Player with id ${id} not found`);
    }
    return player;
}

const addPlayer = async ({name, position, birthdate}: PlayerInput): Promise<Player> => {
    return playerDb.addPlayer({name, position, birthdate});
}

export default {getAllPlayers, getPlayerById, addPlayer};