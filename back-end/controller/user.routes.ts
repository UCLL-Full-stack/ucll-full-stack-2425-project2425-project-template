

import express, {Request, Response} from 'express';
import playerService from '../service/player.service';


const userRouter = express.Router();


userRouter.get('/', async (req: Request, res: Response) => {
    try {
        const players = await playerService.getAllPlayers();
        res.status(200).json(players);
    } catch (error) {
        res.status(400).json({status: 'error' ,message: error});
    }
})


export { userRouter };