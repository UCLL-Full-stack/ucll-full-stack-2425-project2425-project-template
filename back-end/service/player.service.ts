import playerDb from "../repository/player.db"
import { Player } from "../model/player";
import { PlayerInput } from "../types/types";
import { fi } from "date-fns/locale";

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

const findPlayerByNumber = async (number: number): Promise<Player | undefined> => {
    return playerDb.findByNumber(number);
}

const addPlayer = async ({name, number ,position, birthdate}: PlayerInput): Promise<Player> => {
    if (await findPlayerByNumber(number)) {
        throw new Error(`Player with number ${number} already exists`);
    }

    return playerDb.addPlayer({name, number, position, birthdate});
}

export default {getAllPlayers, addPlayer, getPlayerById};