import express, {Request, Response} from 'express';
import teamService from '../service/team.service';
import { MatchInput } from '../types/types';
import { Match } from '../model/match';
import matchService from '../service/match.service';
import { match } from 'assert';


const matchRouter = express.Router()


matchRouter.get('/', async (req: Request, res: Response) => {
    try {
        const matches = await matchService.getAllMatches();
        res.status(200).json(matches);
    } catch (error) {
        res.status(400).json({status: 'error' ,message: error});
    }
})


matchRouter.post('/add', async (req: Request, res: Response) => {
    try {
        const match = <MatchInput>req.body;
        const result = await matchService.addMatch(match);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json(error); 
    }
});

matchRouter.put('/update/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const match = <MatchInput>req.body;
        const result = await matchService.updateMatch(id, match);
        res.status(201).json(result);
    } catch (error) {
        res.status(400).json({status: 'error' ,message: error}); 
    }
});

matchRouter.delete('/delete/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        const result = await matchService.deleteMatch(id);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({status: 'error' ,message: error});
    }
})


matchRouter.post('/:id/players', async (req: Request, res: Response) => {
    try {
        console.log("Received request body:", req.body); // Debugging input
        const id = parseInt(req.params.id);
        const player_ids: number[] = req.body.player_ids;

        if (!Array.isArray(player_ids)) {
            throw new Error("player_ids must be an array");
        }

        const result = await matchService.addPlayerToMatch(id, player_ids);
        res.status(201).json(result);
    } catch (error) {
        console.error("Error adding players to match:", error); // Log detailed error
        res.status(400).json({ status: 'error', message: error });
    }
});

matchRouter.get('/:id/players', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const match = await matchService.getMatchById(id);
      if (!match) throw new Error("Match not found");
      res.status(200).json(match.players);
    } catch (error) {
      res.status(400).json({ status: 'error', message: error });
    }
  });
  



export { matchRouter };