/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Purchase:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *           description: Unique identifier for the purchase.
 *         userId:
 *           type: number
 *           format: int64
 *           description: Unique identifier for the user who made the purchase.
 *         gameId:
 *           type: number
 *           format: int64
 *           description: Unique identifier for the purchased game.
 *         purchaseDate:
 *           type: string
 *           format: date-time
 *           description: Date and time when the purchase was made.
 *         amount:
 *           type: number
 *           description: The total amount paid for the purchase.
 */

import express, { NextFunction, Request, Response } from 'express';
import purchaseService from '../service/purchase';

const purchaseRouter = express.Router();

/**
 * @swagger
 * /purchases:
 *   get:
 *     summary: Get a list of all purchases.
 *     responses:
 *       200:
 *         description: A list of all purchases.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Purchase'
 */
purchaseRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const purchases = await purchaseService.getAllPurchases();
        res.status(200).json(purchases);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /purchases:
 *   post:
 *     summary: Create a new purchase.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: number
 *                 description: ID of the user making the purchase.
 *               gameId:
 *                 type: number
 *                 description: ID of the game being purchased.
 *     responses:
 *       201:
 *         description: The purchase was created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Purchase'
 *       400:
 *         description: Invalid input data.
 */
purchaseRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { userId, gameId } = req.body;

        if (!userId) {
            return res.status(400).json({ error: "Missing userId" });
        }

        if (!gameId) {
            return res.status(400).json({ error: "Missing gameId" });
        }

        const newPurchase = await purchaseService.newPurchase(userId, gameId);
        res.status(201).json(newPurchase);
    } catch (error) {
        next(error);
    }
});

export { purchaseRouter };
