/**
 * @swagger
 *   components:
 *    schemas:
 *      Schedule:
 *        type: object
 *        properties:
 *          id:
 *            type: number
 *            format: int64
 *          user:
 *            $ref: '#/components/schemas/User'
 *          date:
 *            type: string
 *            format: date-time
 *          recipes:
 *            type: array
 *            items:
 *              $ref: '#/components/schemas/Recipe'
 *      NewScheduleInput:
 *        type: object
 *        properties:
 *          recipeId:
 *            type: number
 *            format: int64
 *          userId:
 *            type: number
 *            format: int64
 *          date:
 *            type: string
 *            format: date-time
 */

/**
 * @swagger
 * /schedules:
 *   post:
 *     summary: Schedule a recipe
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NewScheduleInput'
 *     responses:
 *       201:
 *         description: Schedule created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Schedule'
 */

/**
 * @swagger
 * /schedules/{userId}:
 *   get:
 *     summary: Get a user's schedule for a specific date
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: The date in YYYY-MM-DD format
 *     responses:
 *       200:
 *         description: A user's schedule for the specified date
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Schedule'
 *       404:
 *         description: Schedule not found
 */

import express, { Request, Response } from 'express';

const scheduleRouter = express.Router();

// Define your route handlers here

export { scheduleRouter };
