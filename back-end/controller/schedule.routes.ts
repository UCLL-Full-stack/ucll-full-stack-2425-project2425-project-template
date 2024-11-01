import express, { NextFunction, Request, Response } from 'express';
import scheduleService from '../service/schedule.service';

const scheduleRouter = express.Router();

scheduleRouter.get('/:userId/:date', async (req: Request, res: Response, next: NextFunction) => {
    const { userId, date } = req.params;
    try {
        const mealDetails = scheduleService.getMealDetails(parseInt(userId), new Date(date));
        res.status(200).json(mealDetails.map((meal) => meal.toJSON()));
    } catch (error) {
        next(error);
    }
});

scheduleRouter.put(
    '/:userId/:mealId/:date',
    async (req: Request, res: Response, next: NextFunction) => {
        const { userId, mealId, date } = req.params;
        const mealData = req.body;
        try {
            const updatedMeal = scheduleService.editMeal(
                parseInt(userId),
                parseInt(mealId),
                new Date(date),
                mealData
            );
            res.status(200).json(updatedMeal.toJSON());
        } catch (error) {
            next(error);
        }
    }
);

scheduleRouter.delete(
    '/:userId/:mealId/:date',
    async (req: Request, res: Response, next: NextFunction) => {
        const { userId, mealId, date } = req.params;
        try {
            scheduleService.deleteMeal(parseInt(userId), parseInt(mealId), new Date(date));
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
);

export { scheduleRouter };
