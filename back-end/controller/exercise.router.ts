import { Router, Request, Response, NextFunction } from 'express';
import exerciseService from '../service/exercise.service';

const exerciseRouter = Router();

exerciseRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = exerciseService.getAllExercises();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

exerciseRouter.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        const exerciseId = parseInt(req.params.id);
        const user = exerciseService.getExerciseById(exerciseId);
        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

export default exerciseRouter;
