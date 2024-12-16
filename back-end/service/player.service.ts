import { get } from "http";
import { PlayerInput } from "../types";
import playerDB from "../repository/player.db";

const getAllPlayers = async () => {
    const players = await playerDB.getAllPlayers();
    return players;
};

const addPlayer = async (player: PlayerInput) => {
    const newPlayer = await playerDB.addPlayer(player);
    return newPlayer;
};

export default {
    getAllPlayers,
    addPlayer,
};