import { Position } from '../model/position';
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
        throw new Error("Player not found");
    }
}

export default {
    getPositionById,
};
