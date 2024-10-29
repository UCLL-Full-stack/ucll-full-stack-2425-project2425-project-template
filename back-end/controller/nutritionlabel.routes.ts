/**
 * @swagger
 *   components:
 *    schemas:
 *      Nutritionlabel:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            energy:
 *              type: number
 *              description: items calories.
 *            fat:
 *              type: number
 *              description: item fats.
 *            saturatedfats:
 *              type: number
 *              description: item saturatedfats.
 *            carbohydrates:
 *              type: number
 *              description: item carbohydrates.
 *            sugar:
 *              type: number
 *              description: item sugars.
 *            protein:
 *              type: number
 *              description: item proteins.
 *            salts:
 *              type: number
 *              description: item proteins.
 */

import express, { NextFunction, Request, Response } from 'express';
import nutritionlabelService from '../service/nutritionlabel.service';

const nutritionlabelRouter = express.Router();

/**
 * @swagger
 * /nutritionlabels:
 *   get:
 *     summary: Get a list of all nutritionlabels.
 *     responses:
 *       200:
 *         description: A list of nutritionlabels.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Nutritionlabel'
 */

nutritionlabelRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const nutritionlabels = nutritionlabelService.getAllNutritionlabels();
        res.status(200).json(nutritionlabels);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

export { nutritionlabelRouter };
