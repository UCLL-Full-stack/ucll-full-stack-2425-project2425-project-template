/**
 * @swagger
 *   components:
 *    schemas:
 *      Category:
 *        type: string
 *        enum: [fruits, vegetables, dairy]
 *        description: The category of the item
 *      Item:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            format: int64
 *          name:
 *            type: string
 *            description: Item name
 *          price:
 *            type: number
 *            description: Item's price
 *          pathToImage:
 *            type: string
 *            description: Path to the item's image
 *          category:
 *            $ref: '#/components/schemas/Category'
 *          nutritionLabel:
 *            $ref: '#/components/schemas/NutritionLabelInput'
 *      ItemInput:
 *        type: object
 *        required:
 *          - name
 *          - price
 *          - pathToImage
 *          - category
 *        properties:
 *          name:
 *            type: string
 *            description: Item name
 *            example: "Orange"
 *          price:
 *            type: number
 *            description: Item's price
 *            example: 1.99
 *          pathToImage:
 *            type: string
 *            description: Path to the item's image
 *            example: "/images/orange.png"
 *          category:
 *            $ref: '#/components/schemas/Category'
 *            example: "fruits"
 *      NutritionLabelInput:
 *        type: object
 *        required:
 *          - energy
 *          - fat
 *          - saturatedFats
 *          - carbohydrates
 *          - sugar
 *          - protein
 *          - salts
 *        properties:
 *          energy:
 *            type: number
 *            description: Energy in kcal
 *            example: 50
 *          fat:
 *            type: number
 *            description: Fat in grams
 *            example: 0.3
 *          saturatedFats:
 *            type: number
 *            description: Saturated fats in grams
 *            example: 0.1
 *          carbohydrates:
 *            type: number
 *            description: Carbohydrates in grams
 *            example: 12
 *          sugar:
 *            type: number
 *            description: Sugar in grams
 *            example: 10
 *          protein:
 *            type: number
 *            description: Protein in grams
 *            example: 0.9
 *          salts:
 *            type: number
 *            description: Salts in grams
 *            example: 0.01
 */

import express, { NextFunction, Request, Response } from 'express';
import itemService from '../service/item.service';

const itemRouter = express.Router();

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get a list of all items
 *     responses:
 *       200:
 *         description: A list of items
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 *       500:
 *         description: Internal server error
 */

itemRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const items = itemService.getAllItems();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Create a new item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ItemInput'
 *     responses:
 *       201:
 *         description: The created item
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       500:
 *         description: Internal server error
 */

itemRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const item = itemService.createItem(req.body);
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

/**
 * @swagger
 * /items/{itemId}/addNutritionlabel:
 *   post:
 *     summary: Add a nutrition label to an item
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NutritionLabelInput'
 *     responses:
 *       200:
 *         description: The item with the nutrition label added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Item'
 *       500:
 *         description: Internal server error
 */

itemRouter.post(
    '/:itemId/addNutritionlabel',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const itemId = parseInt(req.params.itemId);
            const nutritionlabel = req.body;

            const item = itemService.addNutritionLabelToItem(itemId, nutritionlabel);
            res.status(200).json(item);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
);

export { itemRouter };
