

import express, {NextFunction, Request, Response} from 'express';
import playerService from '../service/player.service';
import exp from 'constants';
import { PlayerInput } from '../types/types';
 

const playerRouter = express.Router();

playerRouter.get('/', async (req: Request, res: Response , next: NextFunction) => {
    try {
        const players = await playerService.getAllPlayers();
        res.status(200).json(players);
    } catch (error) {
        next(error);
    }
})

playerRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const player = await playerService.getPlayerById(id);
        res.status(200).json(player);
    } catch (error) {
        next(error);
    }
})

playerRouter.post('/add', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const player = <PlayerInput>req.body;
        const result = await playerService.addPlayer(player);
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});


playerRouter.delete('/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const result = await playerService.RemovePlayer(id);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
})


playerRouter.put('/update/:id', async (req: Request, res: Response, next: NextFunction) => {   
    try {
        const id = parseInt(req.params.id);
        const player = <PlayerInput>req.body;
        const result = await playerService.updatePlayer(id, player);
        res.status(201).json({status: 'success', message: result});
    } catch (error) {
        next(error); 
    }
});

export default playerRouter;