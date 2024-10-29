/**
 * @swagger
 *   components:
 *    schemas:
 *      Category:
 *          type: string
 *          enum: [fruits, vegetables, dairy]
 *          description: The category of the item.
 *      Item:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Item name.
 *            price:
 *              type: number
 *              description: Item's price.
 *            pathToImage:
 *              type: string
 *              description: Path to the item's image.
 *            category:
 *              $ref: '#/components/schemas/Category'
 *              description: The category of the item.
 */

import express, { NextFunction, Request, Response } from 'express';
import itemService from '../service/item.service';

const itemRouter = express.Router();

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Get a list of all items.
 *     responses:
 *       200:
 *         description: A list of items.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Item'
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
 *     summary: Get a list of all items.
 *     responses:
 *       200:
 *         description: A list of items.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Item'
 */

itemRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const item = itemService.createItem(req.body);
        res.status(201).json(item);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

export { itemRouter };
