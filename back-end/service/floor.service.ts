import { Floor } from '../model/floor';
import { Position } from '../model/position';
import FloorDb from '../repository/floor.db';
import positionDb from '../repository/position.db';
import PositionDb from '../repository/position.db';
import { PositionInput } from '../types';

const getAllFloors = (): Promise<Floor[]> => {
    return FloorDb.getAllFloors();
};

const getFloorById = (id: number): Promise<Floor> => {
    return FloorDb.getFloorById(id);
};

const getFloorPositions = (id: number): Promise<Position[]> => {
    return FloorDb.getFloorPositions(id);
};

const updatePosition = (pos: PositionInput): Promise<Position> => {
    return positionDb.getPositionById(1); //placeholder
}

export default {
    getAllFloors,
    getFloorById,
    getFloorPositions,
    updatePosition,
};