import express, {NextFunction, Request, Response} from 'express';
import coachService from '../service/coach.service';
import { CoachInput } from '../types/types';



const coachRouter = express.Router();

coachRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const coaches = await coachService.getAllcoaches();
        res.status(200).json(coaches);
    } catch (error) {
        next(error);
    }
})


coachRouter.post('/add', async (req: Request, res: Response , next: NextFunction) => {
    try {
        const coach = <CoachInput>req.body;
        const result = await coachService.addCoach(coach);
        res.status(201).json( result);
    } catch (error) {
     next(error); 
    }
});

coachRouter.put('/update/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        const coach = <CoachInput>req.body;
        const result = await coachService.updateCoach(id, coach);
        res.status(200).json(result);
    } catch (error) {
     next(error);
    }
});

coachRouter.delete('/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const id = parseInt(req.params.id);
        await coachService.removeCoach(id);
        res.status(200).json({status: 'success', message: 'Coach deleted successfully'});
    } catch (error) {
     next(error);
    }
});


export { coachRouter };