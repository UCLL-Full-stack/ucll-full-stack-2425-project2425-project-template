// ---- Used in User Story 2 ----

import express, { NextFunction, Request, Response } from 'express';
import scheduleService from '../service/schedule.service';

const scheduleRouter = express.Router();

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
