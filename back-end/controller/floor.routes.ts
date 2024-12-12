import express, { NextFunction, Request, Response } from 'express';
import floorService from '../service/floor.service';
import { PositionInput } from '../types';

const floorRouter = express.Router();

/*
swagger documentation to be added.
*/
floorRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const floors = await floorService.getAllFloors();
        res.status(200).json(floors);
    } catch (error) {
        res.status(400).json({ status: '400', errorMessage: 'Bro is cooked.' });
    }
});

/*
swagger documentation to be added.
*/

floorRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const floor = await floorService.getFloorById(Number(req.params.id));
        res.status(200).json(floor);
    } catch (error) {
        res.status(400).json({
            status: '400',
            errorMessage: `Floor with id ${req.params.id} does not exist.`,
        });
    }
});

/*
swagger documentation to be added.
*/

floorRouter.get('/:id/positions', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const floor = await floorService.getFloorPositions(Number(req.params.id));
        res.status(200).json(floor);
    } catch (error) {
        res.status(400).json({
            status: '400',
            errorMessage: `Floor with id ${req.params.id} does not exist.`,
        });
    }
});

/*
swagger documentation to be added.
*/

floorRouter.put('/:id/position', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const position = <PositionInput>req.body;
        const result = await floorService.updatePosition(position);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({
            status: '400',
            errorMessage: `Something went wrong with updating the position.`,
        });
    }
});

export { floorRouter };
