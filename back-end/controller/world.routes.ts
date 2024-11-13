import express, { NextFunction, Request, Response } from 'express';
import worldService from '../service/world.service';

const worldRouter = express.Router();

/*
swagger documentation to be added.
*/
worldRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const worlds = await worldService.getAllWorlds();
        res.status(200).json(worlds);
    } catch (error) {
        res.status(400).json({ status: '400', errorMessage: 'Bro is cooked.' });
    }
});

/*
swagger documentation to be added.
*/

worldRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const world = await worldService.getWorldById(Number(req.params.id));
        res.status(200).json(world);
    } catch (error) {
        res.status(400).json({
            status: '400',
            errorMessage: `World with id ${req.params.id} does not exist.`,
        });
    }
});

export { worldRouter };