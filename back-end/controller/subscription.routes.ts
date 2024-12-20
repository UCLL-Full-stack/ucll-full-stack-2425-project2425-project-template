/**
 * @swagger
 * components:
 *   schemas:
 *     Subscription:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         type:
 *           type: string
 *           description: Subscription type.
 *         start_date:
 *           type: string
 *           format: date
 *           description: Subscription start date.
 *         duration:
 *           type: string
 *           description: Subscription length.
 *     UserInput:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: User name.
 *         password:
 *           type: string
 *           description: User password.
 *         firstName:
 *           type: string
 *           description: First name.
 *         lastName:
 *           type: string
 *           description: Last name.
 *         email:
 *           type: string
 *           description: E-mail.
 *         role:
 *           $ref: '#/components/schemas/Role'
 *     Role:
 *       type: string
 *       enum:
 *         - admin
 *         - user
 */

import express, { NextFunction, Request, Response } from 'express';
import songService from '../service/song.service';
import { Role, SubscriptionInput, SubscriptionType } from '../types';
import subscriptionService from '../service/subscription.service';

const subscriptionRouter = express.Router()

/**
 * @swagger
 * /subscriptions/{type}:
 *   get:
 *     security:
 *       - bearerAuth: []  
 *     summary: Get a list of all users under a subscription.
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum:
 *             - normal
 *             - premium
 *             - admin
 *     responses:
 *       200:
 *         description: List of Users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
subscriptionRouter.get('/:type', async (req: Request, res: Response, next: NextFunction) => {
    const type = req.params.type as SubscriptionType;

    try {
        const users = await subscriptionService.getAllUsersBySubscription(type);
        res.status(200).json(users);
    } catch {
        res.status(404).json({ message: `Subscription with type ${type} does not exist` });
    }
});


export { subscriptionRouter }