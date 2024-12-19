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

const createWorld = async (world: World): Promise<number> => {
    try {
        const createdWorld = await database.world.create({
            data: {
                name: world.getName(),
                owner: {
                    connect: {
                        id: world.getOwner().getId(),
                        name: world.getOwner().getName(),
                        email: world.getOwner().getEmail(),
                    },
                },
            },
        });
        return createdWorld.id;
    } catch(error){
        console.error(error);
        throw new Error("World could not be made");
    }
}

export default {
    getAllWorlds,
    getWorldById,
    createWorld,
};
