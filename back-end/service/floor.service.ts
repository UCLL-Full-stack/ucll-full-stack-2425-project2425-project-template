import { Floor } from '../model/floor';
import { Position } from '../model/position';
import FloorDb from '../repository/floor.db';
import positionDb from '../repository/position.db';
import PositionDb from '../repository/position.db';
import { PositionInput, PositionUpdate } from '../types';

const getAllFloors = (): Promise<Floor[]> => {
    return FloorDb.getAllFloors();
};

const getFloorById = (id: number): Promise<Floor> => {
    return FloorDb.getFloorById(id);
};

const getFloorPositions = (id: number): Promise<Position[]> => {
    return FloorDb.getFloorPositions(id);
};

const updatePosition = async (p0: number, pos: PositionUpdate): Promise<Position> => {
    const currentFloor = await getFloorById(pos.floorID);
    const currentPos = PositionDb.getPositionById(pos.posID);
    if (pos.active === false) {
        return PositionDb.changePosition(pos);
    }
    if (currentFloor.canMoveToPosition(pos.x, pos.y)) {
        return PositionDb.changePosition(pos);
    } else {
        return currentPos;
    }
};

const addPosition = async (pos: PositionInput): Promise<Position> => {
    return positionDb.addPosition(pos);
};

export default {
    getAllFloors,
    getFloorById,
    getFloorPositions,
    updatePosition,
    addPosition,
};
