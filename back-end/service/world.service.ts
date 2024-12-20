import { error } from 'console';
import { Floor } from '../model/floor';
import { User } from '../model/user';
import { World } from '../model/world';
import worldDb from '../repository/world.db';
import userService from './user.service';
import floorDb from '../repository/floor.db';
import { WorldInput } from '../types';

const getAllWorlds = (): Promise<World[]> => {
    return worldDb.getAllWorlds();
};

const getWorldById = (id: number): Promise<World> => {
    return worldDb.getWorldById(id);
};

const generateWorld = async (input: WorldInput): Promise<World> => {
    let floors: Floor[] = []
    for (let i = 1; i < 11; i++){
        let floor = new Floor({floornumber: i});
        const tiles = floor.getTiles().sort((a, b) => a.getLineNum() - b.getLineNum());
        floor.setTiles(tiles);
        floors.push(floor);
    }
    const user = await userService.getUserByEmail(input.email);
    if (user){
        const world = new World({
            name: input.name,
            owner: user,
            floors: floors,
        })
        const worldId = await worldDb.createWorld(world)

        floors.forEach(floor => {
            floorDb.createFloor(floor, worldId)
        })


        return worldDb.getWorldById(worldId);
    }
    else throw error();
}

export default {
    getAllWorlds,
    getWorldById,
    generateWorld,
};
