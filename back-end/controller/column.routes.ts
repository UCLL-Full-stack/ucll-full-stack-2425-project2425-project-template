import { Router } from 'express';
import columnService from '../service/column.service';

const columnRouter = Router();

columnRouter.put('/:columnId', (req, res) => {
    const { columnId } = req.params;
    const updatedColumn = req.body; 
    try {
        columnService.updateColumn(columnId, updatedColumn);
        res.status(200).json({ message: 'Column updated successfully' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }    
    }
});

columnRouter.delete('/:columnId', (req, res) => {
    const { columnId } = req.params;
    try {
        columnService.deleteColumn(columnId);
        res.status(204).send();
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }    
    }
});

columnRouter.post('/:columnId/tasks', (req, res) => {
    const { columnId } = req.params;
    const task = req.body; 
    try {
        columnService.addTaskToColumn(columnId, task);
        res.status(201).json({ message: 'Task created successfully' });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }    
    }
});

export default columnRouter;
