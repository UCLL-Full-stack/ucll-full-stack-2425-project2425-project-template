import express, { NextFunction, Request, Response } from 'express';
import taskService from '../service/task.service';

const taskRouter = express.Router();

taskRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(await taskService.getAllTasks());
});

taskRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(await taskService.getTaskById(parseInt(req.params.id)));
});


export { taskRouter };