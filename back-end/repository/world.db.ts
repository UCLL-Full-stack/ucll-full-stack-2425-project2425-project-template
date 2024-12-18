import { World } from '../model/world';
import database from './database';

/* 

FUNCTIONALITY

*/

const getAllWorlds = async (): Promise<World[]> => {
    try {
        const result = await database.world.findMany({
            include: {owner: true, floors: {include: {tiles: true, positions: true}}},
        });
        return result.map((worldprisma) => World.from(worldprisma));
    } catch(error){
        console.error(error);
        throw new Error("oops");
    }
}

const getWorldById = async (id: number): Promise<World> => {
    try {
        const result = await database.world.findUniqueOrThrow(
            {
                where: {
                    id: id
                },
                include: {owner: true, floors: {include: {tiles: true, positions: true}}},
            }
        )
        return World.from(result);
    } catch(error){
        console.error(error);
        throw new Error("World not found");
    }
}

export default {
    getAllWorlds,
    getWorldById,
};
