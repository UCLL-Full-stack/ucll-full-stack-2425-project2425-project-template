import express, { NextFunction, Request, Response } from 'express';
import teamService from '../service/team.service';
import { Team } from '../model/team';
import { TeamInput } from '../types/index'

const teamRouter = express.Router();

teamRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teams = teamService.getAllTeams();
        res.status(200).json(teams);
    } catch (error: any) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

teamRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const team = teamService.getTeamById(parseInt(req.params.id));
        res.status(200).json(team);
    } catch (error: any) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

teamRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teamData: TeamInput = req.body;
        const createdTeam: Team = teamService.createTeam(teamData);
        res.status(200).json(createdTeam);
    } catch (error: any) {
        res.status(400).json({ status: 'error', errorMessage: error.message });
    }
});

export { teamRouter };
