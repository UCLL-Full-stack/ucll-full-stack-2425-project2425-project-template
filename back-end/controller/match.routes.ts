import express, { Request, Response } from 'express';
import matchService from '../service/match.service';
import { Match } from '../model/match';
const matchRouter = express.Router();

matchRouter.get('/', async (req: Request, res: Response) => {
    try {
        const matches = await matchService.getAllMatches();
        res.status(200).json(matches);
    } catch (error) {
        console.log(error);
    }
});

matchRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const match = await matchService.getMatchById(Number(req.params.id));
        res.status(200).json(match);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: 'wrong' });
    }
});

matchRouter.post('/', async (req: Request, res: Response) => {
    try {
        const match = <Match>req.body;
        const result = await matchService.createMatch(match);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error creating team:', error);
        res.status(400).json({
            status: 'error',
            errorMessage: 'An unknown error occurred',
        });
    }
});

export default matchRouter;
