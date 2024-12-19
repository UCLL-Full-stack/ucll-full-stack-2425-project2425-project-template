import express, { Request, Response } from 'express';
import teamService from '../service/team.service';
import { TeamInput } from '../types';
const teamRouter = express.Router();

teamRouter.get('/', async (req: Request, res: Response) => {
    try {
        const teams = await teamService.getAllTeams();
        res.status(200).json(teams);
    } catch (error) {
        console.log(error);
    }
});

teamRouter.get('/:id', async (req: Request, res: Response) => {
    try {
        const team = await teamService.getTeamById({ id: Number(req.params.id) });
        res.status(200).json(team);
    } catch (error) {
        res.status(400).json({ status: 'error', errorMessage: 'wrong' });
    }
});

teamRouter.post('/', async (req: Request, res: Response) => {
    try {
        const team = <TeamInput>req.body;

        if (!team.name || !team.competitionId || !team.userId) {
            return res
                .status(400)
                .json({ status: 'error', errorMessage: 'Missing required fields' });
        }
        const result = await teamService.createTeam(team);
        res.status(200).json(result);
    } catch (error) {
        console.error('Error creating team:', error);
        res.status(400).json({
            status: 'error',
            errorMessage: 'An unknown error occurred',
        });
    }
});

// teamRouter.post('/linkTeamToUser/:userId/:teamId', async (req: Request, res: Response) => {
//     try {
//         const userId = Number(req.params.userId)
//         const teamId = Number(req.params.teamId)

//         const result = await teamService.linkTeamToUser(userId, teamId);
//         res.status(200).json(result);
//     } catch (error) {
//         console.error('Error creating team:', error);
//         res.status(400).json({
//             status: 'error',
//             errorMessage: 'An unknown error occurred',
//         });
//     }
// });
teamRouter.get('/competition/:competitionId', async (req: Request, res: Response) => {
    try {
        const competitionId = Number(req.params.competitionId);

        if (isNaN(competitionId)) {
            return res
                .status(400)
                .json({ status: 'error', errorMessage: 'Invalid competition ID' });
        }

        const teams = await teamService.getTeamsByCompetition({ competitionId });
        res.status(200).json(teams);
    } catch (error) {
        console.error('Error fetching teams by competition:', error);
        res.status(500).json({
            status: 'error',
            errorMessage: 'Unable to fetch teams for competition',
        });
    }
});

export default teamRouter;
