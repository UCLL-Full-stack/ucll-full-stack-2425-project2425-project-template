import { Player } from '../model/player';
import playerDb from '../repository/player.db';
import { PlayerInput } from '../types';

const getAllPlayers = async (): Promise<Player[]> => {
    return (await playerDb.getAllPlayers()) || [];
};

const getPlayerById = async (id: number): Promise<Player> => {
    const player = await playerDb.getPlayerById(id);

    if (!player) {
        throw new Error(`Player with id ${id} does not exist.`);
    }
    return player;
};

const createPlayer = async (playerInput: PlayerInput): Promise<Player> => {
    const existingPlayers = (await playerDb.getAllPlayers()) || [];

    if (playerInput.id === undefined || playerInput.id < 0) {
        throw new Error('Invalid id.');
    }
    if (existingPlayers.find((player) => player.getId() === playerInput.id)) {
        throw new Error(`Player with id ${playerInput.id} already exists.`);
    }

    const newPlayer = new Player(playerInput);
    return await playerDb.createPlayer(newPlayer);
};

export default { getAllPlayers, getPlayerById, createPlayer };
