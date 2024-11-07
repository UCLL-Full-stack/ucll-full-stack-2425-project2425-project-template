


import express, { Request, Response, NextFunction } from 'express';
import matchService from '../service/match.service';
import { MatchInput } from '../types';



const matchRouter = express.Router();

matchRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const match = <MatchInput>req.body;
        const result = await matchService.addMatch(match);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
});

matchRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const matches = await matchService.getAllMatches();
        res.status(200).json(matches);
    } catch (error) {
        next(error);
    }
});

export { matchRouter };