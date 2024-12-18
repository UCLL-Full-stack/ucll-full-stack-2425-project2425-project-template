import express, { Request, Response } from 'express';
import matchService from '../service/match.service';
import { Match } from '../model/match';
const matchRouter = express.Router();

// teamRouter.get('/', async (req: Request, res: Response) => {
//     try {
//         const teams = await teamService.getAllTeams();
//         res.status(200).json(teams);
//     } catch (error) {
//         console.log(error);
//     }
// });

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
