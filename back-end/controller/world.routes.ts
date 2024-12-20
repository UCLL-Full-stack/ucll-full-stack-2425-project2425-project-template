import express, { NextFunction, Request, Response } from 'express';
import worldService from '../service/world.service';
import { WorldInput } from '../types';

const worldRouter = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     World:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The world ID
 *         name:
 *           type: string
 *           description: The world name
 *         description:
 *           type: string
 *           description: The world description
 *       default: false
 *     WorldInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The world name
 *         description:
 *           type: string
 *           description: The world description
 *       default: false
 */

/**
 * @swagger
 * /world:
 *   get:
 *     summary: Retrieve a list of worlds
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of worlds
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/World'
 *       400:
 *         description: Bad request
 */
worldRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const worlds = await worldService.getAllWorlds();
        res.status(200).json(worlds);
    } catch (error) {
        res.status(400).json({ status: '400', errorMessage: 'Bro is cooked.' });
    }
});

/**
 * @swagger
 * /world/{id}:
 *   get:
 *     summary: Retrieve a single world by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The world ID
 *     responses:
 *       200:
 *         description: A single world
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/World'
 *       400:
 *         description: World not found
 */
worldRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const world = await worldService.getWorldById(Number(req.params.id));
        res.status(200).json(world);
    } catch (error) {
        res.status(400).json({
            status: '400',
            errorMessage: `World with id ${req.params.id} does not exist.`,
        });
    }
});

/**
 * @swagger
 * /world/add:
 *   post:
 *     summary: Create a new world
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WorldInput'
 *     responses:
 *       200:
 *         description: The created world
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/World'
 *       400:
 *         description: Bad request
 */
worldRouter.post('/add', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const world = <WorldInput>req.body;
        const result = await worldService.generateWorld(world);
        res.status(200).json(result);
    } catch (error) {
        res.status(400).json({
            status: '400',
            errorMessage: `Something went wrong with generating world.`,
        });
    }
});

export { worldRouter };
