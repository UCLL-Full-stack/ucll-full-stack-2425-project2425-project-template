import express, { NextFunction, Request, Response } from 'express';
import scheduleService from '../service/schedule.service';

const scheduleRouter = express.Router();

/**
 * @swagger
 * /schedules/{userId}/{date}:
 *   get:
 *     summary: Get scheduled recipe by userId and date
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: The date of the scheduled recipe
 *     responses:
 *       200:
 *         description: A list of scheduled recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Recipe'
 *       404:
 *         description: Scheduled recipes not found
 */

// Get scheduled recipe by userId and date
scheduleRouter.get('/:userId/:date', async (req: Request, res: Response, next: NextFunction) => {
    const { userId, date } = req.params;
    try {
        const recipeDetails = scheduleService.getScheduledRecipeDetails(
            parseInt(userId),
            new Date(date)
        );
        res.status(200).json(recipeDetails.map((details) => details.toJSON())); // converts each detail to JSON
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /schedules/{userId}/{recipeId}/{date}:
 *   put:
 *     summary: Update only the date of a scheduled recipe
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the recipe
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
 *                 description: The new date for the scheduled recipe
 *     responses:
 *       200:
 *         description: The updated scheduled recipe
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Recipe'
 *       404:
 *         description: Scheduled recipe not found
 */

// Update only the date of a scheduled recipe (future functionality)
scheduleRouter.put(
    '/:userId/:recipeId/:date',
    async (req: Request, res: Response, next: NextFunction) => {
        const { userId, recipeId, date } = req.params;
        const { newDate } = req.body;
        try {
            const updatedRecipe = scheduleService.updateRecipeDate(
                parseInt(userId),
                parseInt(recipeId),
                new Date(date),
                new Date(newDate)
            );
            res.status(200).json(updatedRecipe.toJSON());
        } catch (error) {
            next(error);
        }
    }
);

/**
 * @swagger
 * /schedules/{userId}/{recipeId}/{date}:
 *   delete:
 *     summary: Delete recipe by userId, recipeId, and date
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the user
 *       - in: path
 *         name: recipeId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the recipe
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: The date of the scheduled recipe
 *     responses:
 *       204:
 *         description: Recipe deleted successfully
 *       404:
 *         description: Scheduled recipe not found
 */

// Delete recipe by userId, recipeId, and date
scheduleRouter.delete(
    '/:userId/:recipeId/:date',
    async (req: Request, res: Response, next: NextFunction) => {
        const { userId, recipeId, date } = req.params;
        try {
            scheduleService.deleteRecipe(parseInt(userId), parseInt(recipeId), new Date(date));
            res.status(204).send(); // server processed the request but there's no response body
        } catch (error) {
            next(error);
        }
    }
);

export { scheduleRouter };
