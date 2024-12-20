import { error } from 'console';
import { Player } from '../model/player';
import playerDb from '../repository/player.db';
import { PlayerInput } from '../types';
import userService from './user.service';

const getAllPlayers = (): Promise<Player[]> => {
    return playerDb.getAllPlayers();
};

const getPlayerById = (id: number): Promise<Player> => {
    return playerDb.getPlayerById(id);
};

const getPlayerImage = async (id: number): Promise<string> => {
    const player = await playerDb.getPlayerById(id);
    return player.getImage();
};

const getPlayersByUser = async (email: string): Promise<Player[]> => {
    let players = await playerDb.getAllPlayers();
    const res = players.filter((player) => {
        return player.getUser().getEmail() === email;
    })
    return res;
};

const addPlayer = async (input: PlayerInput): Promise<Player> => {
    const user = await userService.getUserByEmail(input.userEmail);
    if (user){
        const player = new Player({
            name: input.name,
            currency: input.currency,
            statistics: input.statistics,
            class: input.class,
            image: input.image,
            user: user,
        })
        const id = await playerDb.addPlayer(player);
        return getPlayerById(id);
    }
    else throw error();
};

const giveCoin = async (input: string): Promise<Player> => {
    const player = await playerDb.getPlayerById(+input);
    player.giveCoin();
    return playerDb.updatePlayer(player);
};

export default {
    getAllPlayers,
    getPlayerById,
    getPlayerImage,
    getPlayersByUser,
    addPlayer,
    giveCoin,
};
