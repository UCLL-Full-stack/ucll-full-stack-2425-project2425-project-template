import { get } from "http";
import { PlayerInput } from "../types";
import playerDB from "../repository/player.db";

const getAllPlayers = async () => {
    const players = await playerDB.getAllPlayers();
    return players;
};

export default {
    getAllPlayers,
};