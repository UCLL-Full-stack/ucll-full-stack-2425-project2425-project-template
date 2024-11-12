// ---- Used in User Story 2 ----

import express, { NextFunction, Request, Response } from 'express';
import scheduleService from '../service/schedule.service';

const scheduleRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Schedules
 *   description: Schedule management
 */

/**
 * @swagger
 * /schedules/{userId}/{date}:
 *   get:
 *     summary: Get scheduled recipe by userId and date
 *     tags: [Schedules]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: The date for the scheduled recipe
 *     responses:
 *       200:
 *         description: A list of recipe details
 *       404:
 *         description: No scheduled recipes found
 */
scheduleRouter.get('/:userId/:date', async (req: Request, res: Response, next: NextFunction) => {
    const { userId, date } = req.params;
    try {
        const recipeDetails = await scheduleService.getScheduledRecipeDetails(
            parseInt(userId),
            new Date(date)
        );
        res.status(200).json(recipeDetails.map((details) => details.toJSON()));
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /schedules/{userId}/{recipeId}/{date}:
 *   put:
 *     summary: Update the date of a scheduled recipe
 *     tags: [Schedules]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The recipe ID
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: The current date of the scheduled recipe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: The updated schedule object
 *       404:
 *         description: Schedule not found
 */
scheduleRouter.put(
    '/:userId/:recipeId/:date',
    async (req: Request, res: Response, next: NextFunction) => {
        const { userId, recipeId, date } = req.params;
        const { newDate } = req.body;
        try {
            const updatedSchedule = await scheduleService.updateRecipeDate(
                parseInt(userId),
                parseInt(recipeId),
                new Date(date),
                new Date(newDate)
            );
            res.status(200).json(updatedSchedule.toJSON());
        } catch (error) {
            next(error);
        }
    }
);

/**
 * @swagger
 * /schedules/{userId}/{recipeId}/{date}:
 *   delete:
 *     summary: Delete a scheduled recipe by userId, recipeId, and date
 *     tags: [Schedules]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The recipe ID
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: The date of the scheduled recipe
 *     responses:
 *       204:
 *         description: No content
 *       404:
 *         description: Schedule not found
 */
scheduleRouter.delete(
    '/:userId/:recipeId/:date',
    async (req: Request, res: Response, next: NextFunction) => {
        const { recipeId, date } = req.params;
        const userId = 1; // TEMPORARY USER ID

        try {
            await scheduleService.deleteScheduledRecipe(userId, parseInt(recipeId), new Date(date));
            res.status(204).send(); // server processed the request but there's no response body
        } catch (error) {
            next(error);
        }
    }
);

export { scheduleRouter };
