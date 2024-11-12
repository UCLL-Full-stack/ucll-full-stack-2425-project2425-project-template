import express, { NextFunction, Request, Response } from 'express';
import worldService from '../service/world.service';

const worldRouter = express.Router();

/*
swagger documentation to be added.
*/
worldRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const players = await playerService.getAllPlayers();
        res.status(200).json(players);
    } catch (error) {
        res.status(400).json({ status: '400', errorMessage: 'Bro is cooked.' });
    }
});

/*
swagger documentation to be added.
*/

worldRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const player = await playerService.getPlayerById(Number(req.params.id));
        res.status(200).json(player);
    } catch (error) {
        res.status(400).json({
            status: '400',
            errorMessage: `Player with id ${req.params.id} does not exist.`,
        });
    }
});

export { worldRouter };