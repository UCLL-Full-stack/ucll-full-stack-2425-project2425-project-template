// import { Router } from 'express';
// import columnService from '../service/column.service';

// const columnRouter = Router();


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
//  *           description: Detailed description of the task
//  *         dueDate:
//  *           type: string
//  *           format: date-time
//  *           description: Due date for the task
//  *         assignees:
//  *           type: array
//  *           items:
//  *             type: string
//  *             description: User IDs of the assignees
//  * 
//  *     Column:
//  *       type: object
//  *       properties:
//  *         columnId:
//  *           type: string
//  *           description: Unique identifier for the column
//  *         columnName:
//  *           type: string
//  *           description: Name of the column
//  *         tasks:
//  *           type: array
//  *           items:
//  *             $ref: '#/components/schemas/Task'
//  *
//  *     UpdateColumn:
//  *       type: object
//  *       properties:
//  *         columnName:
//  *           type: string
//  *           description: Name of the column
//  *         tasks:
//  *           type: array
//  *           items:
//  *             type: string
//  *             description: List of task IDs
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
//  * /api/columns/{columnId}:
//  *   put:
//  *     summary: Update a column by ID
//  *     parameters:
//  *       - in: path
//  *         name: columnId
//  *         required: true
//  *         description: The ID of the column to update
//  *         schema:
//  *           type: string
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/UpdateColumn'
//  *     responses:
//  *       200:
//  *         description: Column updated successfully
//  *       400:
//  *         description: Bad Request
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/ErrorResponse'
//  */
// columnRouter.put('/:columnId', (req, res) => {
//     const { columnId } = req.params;
//     const updatedColumn = req.body; 
//     try {
//         columnService.updateColumn(columnId, updatedColumn);
//         res.status(200).json({ message: 'Column updated successfully' });
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
//  * /api/columns/{columnId}:
//  *   delete:
//  *     summary: Delete a column by ID
//  *     parameters:
//  *       - in: path
//  *         name: columnId
//  *         required: true
//  *         description: The ID of the column to delete
//  *         schema:
//  *           type: string
//  *     responses:
//  *       204:
//  *         description: Column deleted successfully
//  *       400:
//  *         description: Bad Request
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/ErrorResponse'
//  */
// columnRouter.delete('/:columnId', (req, res) => {
//     const { columnId } = req.params;
//     try {
//         columnService.deleteColumn(columnId);
//         res.status(204).send();
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
//  * /api/columns/{columnId}/tasks:
//  *   post:
//  *     summary: Add a task to a column
//  *     parameters:
//  *       - in: path
//  *         name: columnId
//  *         required: true
//  *         description: The ID of the column to add the task to
//  *         schema:
//  *           type: string
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/Task'
//  *     responses:
//  *       201:
//  *         description: Task created successfully
//  *       400:
//  *         description: Bad Request
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/ErrorResponse'
//  */
// columnRouter.post('/:columnId/tasks', (req, res) => {
//     const { columnId } = req.params;
//     const task = req.body; 
//     try {
//         columnService.addTaskToColumn(columnId, task);
//         res.status(201).json({ message: 'Task created successfully' });
//     } catch (error) {
//         if (error instanceof Error) {
//             res.status(400).json({ error: error.message });
//         } else {
//             res.status(400).json({ error: 'An unknown error occurred' });
//         }    
//     }
// });

// export default columnRouter;
