// import { Router } from 'express';
// import taskService from '../service/task.service';

// const taskRouter = Router();

// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     Task:
//  *       type: object
//  *       properties:
//  *         taskId:
//  *           type: string
//  *           description: Unique identifier for the task
//  *         title:
//  *           type: string
//  *           description: Title of the task
//  *         description:
//  *           type: string
//  *           description: Description of the task
//  *         dueDate:
//  *           type: string
//  *           format: date-time
//  *           description: Due date of the task
//  *         assignees:
//  *           type: array
//  *           items:
//  *             type: string
//  *             description: List of user IDs assigned to the task
//  * 
//  *     ErrorResponse:
//  *       type: object
//  *       properties:
//  *         error:
//  *           type: string
//  *           description: Error message
//  */


// /**
//  * @swagger
//  * /api/tasks/{taskId}:
//  *   put:
//  *     summary: Update a task
//  *     parameters:
//  *       - in: path
//  *         name: taskId
//  *         required: true
//  *         description: The ID of the task to update
//  *         schema:
//  *           type: string
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/Task'
//  *     responses:
//  *       200:
//  *         description: Task updated successfully
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: object
//  *               properties:
//  *                 message:
//  *                   type: string
//  *                   example: Task updated successfully
//  *       400:
//  *         description: Bad Request
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/ErrorResponse'
//  */
// taskRouter.put('/:taskId', (req, res) => {
//     const { taskId } = req.params;
//     const updatedTask = req.body;
//     try {
//         taskService.updateTask(taskId, updatedTask);
//         res.status(200).json({ message: 'Task updated successfully' });
//     } catch (error) {
//         if (error instanceof Error) {
//             res.status(400).json({ error: error.message });
//         } else {
//             res.status(400).json({ error: 'An unknown error occurred' });
//         }    
//     }
// });

// /**
//  * @swagger
//  * /api/tasks/{taskId}:
//  *   delete:
//  *     summary: Delete a task
//  *     parameters:
//  *       - in: path
//  *         name: taskId
//  *         required: true
//  *         description: The ID of the task to delete
//  *         schema:
//  *           type: string
//  *     responses:
//  *       204:
//  *         description: Task deleted successfully
//  *       400:
//  *         description: Bad Request
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/ErrorResponse'
//  */
// taskRouter.delete('/:taskId', (req, res) => {
//     const { taskId } = req.params;
//     try {
//         taskService.deleteTask(taskId);
//         res.status(204).send();
//     } catch (error) {
//         if (error instanceof Error) {
//             res.status(400).json({ error: error.message });
//         } else {
//             res.status(400).json({ error: 'An unknown error occurred' });
//         }    
//     }
// });

// export default taskRouter;
