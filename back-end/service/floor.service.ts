import { Floor } from '../model/floor';
import { Position } from '../model/position';
import FloorDb from '../repository/floor.db';
import PositionDb from '../repository/position.db';
import { PositionUpdate } from '../types';

const getAllFloors = (): Promise<Floor[]> => {
    return FloorDb.getAllFloors();
};

const getFloorById = (id: number): Promise<Floor> => {
    return FloorDb.getFloorById(id);
};

const getFloorPositions = (id: number): Promise<Position[]> => {
    return FloorDb.getFloorPositions(id);
};

const updatePosition = async (pos: PositionUpdate): Promise<Position> => {
    const currentFloor = await getFloorById(pos.floorID);
    const currentPos = PositionDb.getPositionById(pos.posID);
    if (currentFloor.canMoveToPosition(pos.x, pos.y)){
        return PositionDb.changePosition(pos);
    }
    else{
        return currentPos;
    }
}

export default {
    getAllFloors,
    getFloorById,
    getFloorPositions,
    updatePosition,
};