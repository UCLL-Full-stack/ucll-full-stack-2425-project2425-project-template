/**
 * @swagger
 *   components:
 *    schemas:
 *      Shoppingcart:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: name of the shopping cart.
 *            deliveryDate:
 *              type: string
 *              format: date
 *              description: Delivery date of the shoppingcart.
 */

import express, { NextFunction, Request, Response } from 'express';
import shoppingcartService from '../service/shoppingcart.service';

const shoppingcartRouter = express.Router();

/**
 * @swagger
 * /shoppingcarts:
 *   get:
 *     summary: Get a list of all shoppingcarts.
 *     responses:
 *       200:
 *         description: A list of shoppingcarts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                  $ref: '#/components/schemas/Shoppingcart'
 */

shoppingcartRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const shoppingcarts = shoppingcartService.getAllShoppingcarts();
        res.status(200).json(shoppingcarts);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

shoppingcartRouter.post(
    '/addItem/:itemId/:shoppingcartId',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const itemId = parseInt(req.params.itemId, 10);
            const shoppingcartId = parseInt(req.params.shoppingcartId);
            const shoppingcart = shoppingcartService.addItemToShoppingcart({
                itemId,
                shoppingcartId,
            });
            res.status(200).json(shoppingcart);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }
);

shoppingcartRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const shoppingcart = shoppingcartService.createShoppingcart(req.body);
        res.status(201).json(shoppingcart);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

export { shoppingcartRouter };
