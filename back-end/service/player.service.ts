import { Player } from '../model/player';
import playerDb from '../repository/player.db';
import { PlayerInput } from '../types';

const getAllPlayers = (): Player[] => {
    return playerDb.getAllPlayers();
};

const getPlayerById = (id: number): Player | undefined => {
    if (!playerDb.getPlayerById(id)) {
        throw new Error(`Player with id ${id} does not exist.`);
    }
    return playerDb.getPlayerById(id);
};

const createPlayer = (playerInput: PlayerInput): Player => {
    const existingPlayers = playerDb.getAllPlayers() || [];

    if (playerInput.id === undefined || playerInput.id < 0) {
        throw new Error('Invalid id.');
    }
    if (existingPlayers.find((player) => player.getId() === playerInput.id)) {
        throw new Error(`Player with id ${playerInput.id} already exists.`);
    }

    const newPlayer = new Player(playerInput);
    playerDb.createPlayer(newPlayer);
    return newPlayer;
};

export default { getAllPlayers, getPlayerById, createPlayer };
