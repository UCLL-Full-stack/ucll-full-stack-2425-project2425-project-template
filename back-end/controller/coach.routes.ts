import express, {Request, Response} from 'express';
import coachService from '../service/coach.service';
import { CoachInput } from '../types/types';



const coachRouter = express.Router();

coachRouter.get('/', async (req: Request, res: Response) => {
    try {
        const coaches = await coachService.getAllcoaches();
        res.status(200).json(coaches);
    } catch (error) {
        res.status(400).json({status: 'error' ,message: error});
    }
})


coachRouter.post('/add', async (req: Request, res: Response) => {
    try {
        const coach = <CoachInput>req.body;
        const result = await coachService.addCoach(coach);
        res.status(201).json( result);
    } catch (error) {
        res.status(400).json(error); 
    }
});

coachRouter.put('/update/:id', async (req: Request, res: Response) => {
    try {
        const coach = <CoachInput>req.body;
        const id = parseInt(req.params.id);
        const result = await coachService.updateCoach(id, coach);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json(error);
    }
});

coachRouter.delete('/delete/:id', async (req: Request, res: Response) => {
    try {
        const id = parseInt(req.params.id);
        await coachService.removeCoach(id);
        res.status(204).end();
    } catch (error) {
        res.status(400).json(error);
    }
});

export { coachRouter };