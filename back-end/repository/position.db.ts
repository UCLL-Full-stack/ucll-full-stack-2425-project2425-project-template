import { Position } from '../model/position';
import { PositionInput, PositionUpdate } from '../types';
import database from './database';


const getPositionById = async (id: number): Promise<Position> => {
    try {
        const result = await database.position.findUniqueOrThrow(
            {
                where: {
                    id: id
                },
            }
        )
        return Position.from(result);
    } catch(error){
        console.error(error);
        throw new Error("Position not found");
    }
}

const changePosition = async (toUpdate: PositionUpdate): Promise<Position> => {
    try {
        const positionPrisma = await database.position.update({
            where: { id: toUpdate.posID },
            data: {
                x: toUpdate.x,
                y: toUpdate.y,
                active: toUpdate.active,
            },
        });
        return Position.from(positionPrisma);
    } catch(error){
        console.error(error);
        throw new Error("Position update failed");
    }
}

const addPosition = async (position: PositionInput): Promise<Position> => {
    try {
        const positionPrisma = await database.position.create({
            data: {
                x: position.x,
                y: position.y,
                type: position.type,
                active: position.active,
                floor: { connect: { id: position.floorID } },
                player: { connect: { id: position.playerID } },
            },
        });
        return Position.from(positionPrisma);
    } catch(error){
        console.error(error);
        throw new Error("Position update failed");
    }
}

export default {
    getPositionById,
    changePosition,
    addPosition,
};
