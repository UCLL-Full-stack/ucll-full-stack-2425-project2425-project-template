import { te } from 'date-fns/locale';
import express, {NextFunction, Request, Response} from 'express';
import teamService from '../service/team.service';
import { TeamInput } from '../types/types';


const teamRouter = express.Router();


teamRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const teams = await teamService.getAllTeams();
        res.status(200).json(teams);
    } catch (error) {
        next(error);
    }
})


teamRouter.post('/add', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const team = <TeamInput>req.body;
        const result = await teamService.addTeam(team);
        res.status(201).json(result);
    } catch (error) {
        next(error); 
    }
});


teamRouter.put('/update/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const team = <TeamInput>req.body;
        const result = await teamService.updateTeam(id, team);
        res.status(201).json(result);
    } catch (error) {
        next(error); 
    }
});

teamRouter.delete('/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const result = await teamService.deleteTeam(id);
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
})

export { teamRouter };