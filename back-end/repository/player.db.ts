import { error } from 'console';
import { Player } from '../model/player';
import { PlayerInput } from '../types';
import database from './database';

/* 

FUNCTIONALITY

*/

const getAllPlayers = async (): Promise<Player[]> => {
    try {
        const result = await database.player.findMany({
            include: { user: true },
        });
        return result.map((playerprisma) => Player.from(playerprisma));
    } catch (error) {
        console.error(error);
        throw new Error('oops');
    }
};

const getPlayerById = async (id: number): Promise<Player> => {
    try {
        const result = await database.player.findUniqueOrThrow({
            where: {
                id: id,
            },
            include: { user: true },
        });
        return Player.from(result);
    } catch (error) {
        console.error(error);
        throw new Error('Player not found');
    }
};

const addPlayer = async (player: Player): Promise<number> => {
    try {
        const createdPlayer = await database.player.create({
            data: {
                name: player.getName(),
                statistics: player.getStatistics(),
                class: player.getClass(),
                currency: player.getCurrency(),
                image: player.getImage(),
                user: {
                    connect: {
                        id: player.getUser().getId(),
                        name: player.getUser().getName(),
                        email: player.getUser().getEmail(),
                    },
                },
            },
        })
        return createdPlayer.id;
    } catch(error){
        console.error(error);
        throw new Error("Player could not be made");
    }
}

const updatePlayer = async  (player: Player): Promise<Player> => {
    try {
        const createdPlayer = await database.player.update({
            where: { id: player.getId() },
            data: {
                name: player.getName(),
                statistics: player.getStatistics(),
                class: player.getClass(),
                currency: player.getCurrency(),
                image: player.getImage(),
                user: {
                    connect: {
                        id: player.getUser().getId(),
                        name: player.getUser().getName(),
                        email: player.getUser().getEmail(),
                    },
                },
            },
            include: { user: true },
        })
        return Player.from(createdPlayer);
    } catch(error){
        console.error(error);
        throw new Error("Player could not be made");
    }
}



export default {
    getAllPlayers,
    getPlayerById,
    addPlayer,
    updatePlayer,
};
