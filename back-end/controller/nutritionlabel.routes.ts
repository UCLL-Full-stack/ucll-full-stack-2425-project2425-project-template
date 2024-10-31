/**
 * @swagger
 *   components:
 *    schemas:
 *      NutritionLabel:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            format: int64
 *            description: Unique identifier for the nutrition label
 *          energy:
 *            type: number
 *            description: Energy content in kcal
 *          fat:
 *            type: number
 *            description: Fat content in grams
 *          saturatedFats:
 *            type: number
 *            description: Saturated fats content in grams
 *          carbohydrates:
 *            type: number
 *            description: Carbohydrates content in grams
 *          sugar:
 *            type: number
 *            description: Sugar content in grams
 *          protein:
 *            type: number
 *            description: Protein content in grams
 *          salts:
 *            type: number
 *            description: Salt content in grams
 */

import express, { NextFunction, Request, Response } from 'express';
import nutritionlabelService from '../service/nutritionlabel.service';

const nutritionlabelRouter = express.Router();

/**
 * @swagger
 * /nutritionlabels:
 *   get:
 *     summary: Get a list of all nutrition labels
 *     responses:
 *       200:
 *         description: A list of nutrition labels
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/NutritionLabel'
 *       500:
 *         description: Internal server error
 */

nutritionlabelRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const nutritionlabels = nutritionlabelService.getAllNutritionlabels();
        res.status(200).json(nutritionlabels);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

/**
 * @swagger
 * /nutritionlabels:
 *   post:
 *     summary: Create a new nutrition label
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NutritionLabelInput'
 *     responses:
 *       201:
 *         description: The created nutrition label
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/NutritionLabel'
 *       500:
 *         description: Internal server error
 */

nutritionlabelRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const nutritionlabel = req.body;
        const newNutritionlabel = nutritionlabelService.createNutritionlabel(nutritionlabel);
        res.status(201).json(newNutritionlabel);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

export { nutritionlabelRouter };
