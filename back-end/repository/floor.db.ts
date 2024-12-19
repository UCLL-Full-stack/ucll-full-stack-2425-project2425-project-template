import { error } from 'console';
import { Floor } from '../model/floor';
import { Position } from '../model/position';
import database from './database';
import { Line } from '../model/line';

/* 

FUNCTIONALITY

*/

const getAllFloors = async (): Promise<Floor[]> => {
    try {
        const result = await database.floor.findMany({
            include: {tiles: true, positions: true},
        });
        return result.map((floorprisma) => Floor.from(floorprisma));
    } catch(error){
        console.error(error);
        throw new Error("oops");
    }
}

const getFloorById = async (id: number): Promise<Floor> => {
    try {
        const result = await database.floor.findUniqueOrThrow(
            {
                where: {
                    id: id
                },
                include: {tiles: true, positions: true},
            }
        )
        return Floor.from(result);
    } catch(error){
        console.error(error);
        throw new Error("Floor not found");
    }
}

const getFloorPositions = async (id: number): Promise<Position[]> => {
    try {
        const result = await database.floor.findUniqueOrThrow(
            {
                where: {
                    id: id
                },
                include: {positions: true},
            }
        )
        return result.positions.map((positionprisma) => Position.from(positionprisma));
    } catch(error){
        console.error(error);
        throw new Error("Floor not found");
    }
}


const createFloor = async (floor: Floor, createdWorld: number): Promise<number> => {
    try {
        const createdFloor = await database.floor.create({
            data: {
                floornumber: floor.getFloornumber(),
                world: { connect: { id: createdWorld } },
            },
        });
        const tiles = floor.getTiles();
        if (!tiles) throw error;
        // Create lines
        for (const line of tiles) {
            await database.line.create({
                data: {
                    tiles: line.getTiles(),
                    lineNum: line.getLineNum(),
                    floor: { connect: { id: createdFloor.id } },
                },
            });
        }
        const positions = floor.getPositions();
        if (!positions) throw error;
        // Create Positions
        for (const pos of positions) {
            await database.position.create({
                data: {
                    x: pos.getX(),
                    y: pos.getY(),
                    type: pos.getType(),
                    active: pos.getActive(),
                    floor: { connect: { id: createdFloor.id } },
                    player: undefined,
                },
            });
        }
        return createdFloor.id;
    } catch(error){
        console.error(error);
        throw new Error("World could not be made");
    }
}

export default {
    getAllFloors,
    getFloorById,
    getFloorPositions,
    createFloor,
};
