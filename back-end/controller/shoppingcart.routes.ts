/**
 * @swagger
 *   components:
 *    schemas:
 *      ShoppingCart:
 *        type: object
 *        properties:
 *          id:
 *            type: integer
 *            format: int64
 *            description: Unique identifier for the shopping cart
 *          name:
 *            type: string
 *            description: Name of the shopping cart
 *          deliveryDate:
 *            type: string
 *            format: date
 *            description: Delivery date of the shopping cart
 *      ShoppingCartInput:
 *        type: object
 *        required:
 *          - name
 *          - deliveryDate
 *        properties:
 *          name:
 *            type: string
 *            description: Name of the shopping cart
 *            example: "Weekly Groceries"
 *          deliveryDate:
 *            type: string
 *            format: date
 *            description: Delivery date of the shopping cart
 *            example: "2024-11-01"
 */

import express, { NextFunction, Request, Response } from 'express';
import shoppingcartService from '../service/shoppingcart.service';

const shoppingcartRouter = express.Router();

/**
 * @swagger
 * /shoppingcarts:
 *   get:
 *     summary: Get a list of all shopping carts
 *     responses:
 *       200:
 *         description: A list of shopping carts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ShoppingCart'
 *       500:
 *         description: Internal server error
 */

shoppingcartRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const shoppingcarts = shoppingcartService.getAllShoppingcarts();
        res.status(200).json(shoppingcarts);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

/**
 * @swagger
 * /shoppingcarts:
 *   post:
 *     summary: Create a new shopping cart
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ShoppingCartInput'
 *     responses:
 *       201:
 *         description: The created shopping cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoppingCart'
 *       500:
 *         description: Internal server error
 */

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

/**
 * @swagger
 * /shoppingcarts/addItem/{itemId}/{shoppingcartId}:
 *   post:
 *     summary: Add an item to a shopping cart
 *     parameters:
 *       - in: path
 *         name: itemId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the item to add
 *       - in: path
 *         name: shoppingcartId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the shopping cart
 *     responses:
 *       200:
 *         description: The updated shopping cart
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ShoppingCart'
 *       500:
 *         description: Internal server error
 */

shoppingcartRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const shoppingcart = shoppingcartService.createShoppingcart(req.body);
        res.status(201).json(shoppingcart);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
});

export { shoppingcartRouter };
