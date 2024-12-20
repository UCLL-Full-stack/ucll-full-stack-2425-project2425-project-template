

import express, {NextFunction, Request, Response} from 'express';
import playerService from '../service/player.service';
import exp from 'constants';
import { PlayerInput } from '../types/types';
import statsService from '../service/stats.service';
import { decodeJwtToken } from '../util/jwt';
 

const playerRouter = express.Router();

playerRouter.get('/', async (req: Request , res: Response , next: NextFunction) => {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const {email} = decodeJwtToken(token);
        const players = await playerService.getAllPlayers({email});
        res.status(200).json(players);
    } catch (error) {
        next(error);
    }
})

playerRouter.get('/:id', async (req: Request & {}, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const {email} = decodeJwtToken(token);
        const id = parseInt(req.params.id);
        const player = await playerService.getPlayerById(id, {email});
        res.status(200).json(player);
    } catch (error) {
        next(error);
    }
})

playerRouter.post('/add', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const {email, role} = decodeJwtToken(token);
        const player = <PlayerInput>req.body;
        const result = await playerService.addPlayer(player, {email, role});
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});


playerRouter.delete('/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const {email, role} = decodeJwtToken(token);
        const id = parseInt(req.params.id);
        const result = await playerService.RemovePlayer(id, {email, role});
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
})


playerRouter.put('/update/:id', async (req: Request, res: Response, next: NextFunction) => {   
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const {email, role} = decodeJwtToken(token);
      const id = parseInt(req.params.id);
      const { name, number, position, birthdate, stat } = req.body;
  
      const updatedPlayer = await playerService.updatePlayer(id, {
        name,
        number,
        position,
        birthdate,
      }, { email, role });
  
      if (stat && stat.id) {
        await statsService.updateStats(stat.id, {
          appearances: stat.appearances,
          goals: stat.goals,
          assists: stat.assists,
        }, { email, role });
      }
  
      res.status(200).json(updatedPlayer);
    } catch (error) {
        next(error); 
    }
  });
  

export default playerRouter;