import express, { NextFunction, Request, Response } from 'express';
import nutritionlabelService from '../service/nutritionlabel.service';

const nutritionlabelRouter = express.Router();

nutritionlabelRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const nutritionlabels = nutritionlabelService.getAllNutritionlabels();
        res.status(200).json(nutritionlabels);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

export { nutritionlabelRouter };
