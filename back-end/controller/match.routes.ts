import express, {NextFunction, Request, Response} from 'express';
import teamService from '../service/team.service';
import { MatchInput } from '../types/types';
import { Match } from '../model/match';
import matchService from '../service/match.service';
import { match } from 'assert';
import { decodeJwtToken } from '../util/jwt';


const matchRouter = express.Router()


matchRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const {email} = decodeJwtToken(token);
        const matches = await matchService.getAllMatches({email});
        res.status(200).json(matches);
    } catch (error) {
       next(error);
    }
})


matchRouter.post('/add', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const {email, role} = decodeJwtToken(token);
        const match = <MatchInput>req.body;
        const result = await matchService.addMatch(match, {email, role});
        res.status(201).json(result);
    } catch (error) {
        next(error); 
    }
});

matchRouter.put('/update/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const {email, role} = decodeJwtToken(token);
        const id = parseInt(req.params.id);
        const match = <MatchInput>req.body;
        const result = await matchService.updateMatch(id, match, {email, role});
        res.status(201).json(result);
    } catch (error) {
       next(error);
    }
});

matchRouter.delete('/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const {email, role} = decodeJwtToken(token);
        const id = parseInt(req.params.id);
        const result = await matchService.deleteMatch(id, {email, role});
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
})


matchRouter.post('/:id/players', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const {email, role} = decodeJwtToken(token);
        console.log("Received request body:", req.body); // Debugging input
        const id = parseInt(req.params.id);
        const player_ids: number[] = req.body.player_ids;

        if (!Array.isArray(player_ids)) {
            throw new Error("player_ids must be an array");
        }

        const result = await matchService.addPlayerToMatch(id, player_ids, {email, role});
        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
});

matchRouter.get('/:id/players', async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = parseInt(req.params.id);
      const match = await matchService.getMatchById(id);
      if (!match) throw new Error("Match not found");
      res.status(200).json(match.players);
    } catch (error) {
      next(error);
    }
  });
  



export { matchRouter };