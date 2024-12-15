import { Position } from '../model/position';
import { PositionUpdate } from '../types';
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

export default {
    getPositionById,
    changePosition,
};
