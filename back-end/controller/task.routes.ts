import { Router } from 'express';
import taskService from '../service/task.service';
import { validateTask } from '../util/validators';

const taskRouter = Router();

// Update a task by ID
taskRouter.put('/:taskId', validateTask, (req, res) => {
    const { taskId } = req.params;
    const updatedTask = req.body; // Expecting updated task details in request body
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

// Delete a task by ID
taskRouter.delete('/:taskId', (req, res) => {
    const { taskId } = req.params;
    try {
        taskService.deleteTask(taskId);
        res.status(204).send(); // No content to send back
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }    
    }
});

export default taskRouter;
