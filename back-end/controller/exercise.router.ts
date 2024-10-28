import { Router, Request, Response, NextFunction } from 'express';
import exerciseService from '../service/exercise.service';

const exerciseRouter = Router();

exerciseRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = exerciseService.getAllExercises();
        res.status(200).json(users);
    } catch (error: any) { 
        const errorMessage = error.message || "An unexpected error occurred";
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

exerciseRouter.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        const exerciseId = parseInt(req.params.id);
        const user = exerciseService.getExerciseById(exerciseId);
        res.status(200).json(user);
    } catch (error: any) { 
        const errorMessage = error.message || "An unexpected error occurred";
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

export default exerciseRouter;
