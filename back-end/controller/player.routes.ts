import express, { NextFunction, Request, Response } from 'express';
import playerService from '../service/player.service';
import { PlayerInput } from '../types';

const playerRouter = express.Router();

/*
swagger documentation to be added.
*/
playerRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
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

playerRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
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

/*
swagger documentation to be added.
*/

playerRouter.get('/image/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const player = await playerService.getPlayerImage(Number(req.params.id));
        res.status(200).json(player);
    } catch (error) {
        res.status(400).json({
            status: '400',
            errorMessage: `Player with id ${req.params.id} does not exist.`,
        });
    }
});

/*
swagger documentation to be added.
*/

playerRouter.get('/user/:email', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const players = await playerService.getPlayersByUser(req.params.email);
        res.status(200).json(players);
    } catch (error) {
        res.status(400).json({
            status: '400',
            errorMessage: `User with id ${req.params.id} does not exist.`,
        });
    }
});

/*
swagger documentation to be added.
*/

playerRouter.post('/add', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const player = <PlayerInput>req.body;
        const result = await playerService.addPlayer(player)
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({
            status: '400',
            errorMessage: `Something went wrong with creating player.`,
        });
    }
})

/*
swagger documentation to be added.
*/

playerRouter.put('/coin/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await playerService.giveCoin(req.params.id)
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({
            status: '400',
            errorMessage: `Something went wrong with giving a coin.`,
        });
    }
})

export { playerRouter };
