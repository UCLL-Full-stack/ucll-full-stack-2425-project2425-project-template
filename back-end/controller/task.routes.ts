import { Router } from 'express';
import taskService from '../service/task.service';

const taskRouter = Router();

taskRouter.put('/:taskId', (req, res) => {
    const { taskId } = req.params;
    const updatedTask = req.body;
    try {
        taskService.updateTask(taskId, updatedTask);
        res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }    
    }
});

taskRouter.delete('/:taskId', (req, res) => {
    const { taskId } = req.params;
    try {
        taskService.deleteTask(taskId);
        res.status(204).send();
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }    
    }
});

export default taskRouter;
