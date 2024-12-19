import { te } from 'date-fns/locale';
import express, {NextFunction, Request, Response} from 'express';
import teamService from '../service/team.service';
import { TeamInput } from '../types/types';
import { decodeJwtToken } from '../util/jwt';


const teamRouter = express.Router();


teamRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const {email} = decodeJwtToken(token);
        const teams = await teamService.getAllTeams({email});
        res.status(200).json(teams);
    } catch (error) {
        next(error);
    }
})


teamRouter.post('/add', async (req: Request, res: Response, next: NextFunction) => {
    try {

        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const {email, role} = decodeJwtToken(token);
        const team = <TeamInput>req.body;
        const result = await teamService.addTeam(team, {email, role});
        res.status(201).json(result);
    } catch (error) {
        next(error); 
    }
});


teamRouter.put('/update/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const {email, role} = decodeJwtToken(token);
        const id = parseInt(req.params.id);
        const team = <TeamInput>req.body;
        const result = await teamService.updateTeam(id, team, {email, role});
        res.status(201).json(result);
    } catch (error) {
        next(error); 
    }
});

teamRouter.delete('/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.slice(7);
        if (!token) {
            throw new Error('Authorization token is missing');
        }
        const {email, role} = decodeJwtToken(token);
        const id = parseInt(req.params.id);
        const result = await teamService.deleteTeam(id, {email, role});
        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
})

export { teamRouter };