import express, { NextFunction, Request, Response } from 'express';
import floorService from '../service/floor.service';
import { PositionInput, PositionUpdate } from '../types';

const floorRouter = express.Router();

/**
 * @swagger
 * /floors:
 *   get:
 *     summary: Get all floors
 *     tags: [Floors]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all floors
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Floor'
 *       400:
 *         description: Bad request
 */
floorRouter.get('/', async (req: Request & { auth: any }, res: Response, next: NextFunction) => {
    try {
        const floors = await floorService.getAllFloors();
        res.status(200).json(floors);
    } catch (error) {
        res.status(400).json({ status: '400', errorMessage: 'Bro is cooked.' });
    }
});

/**
 * @swagger
 * /floors/{id}:
 *   get:
 *     summary: Get floor by ID
 *     tags: [Floors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Floor ID
 *     responses:
 *       200:
 *         description: Floor data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Floor'
 *       400:
 *         description: Floor with specified ID does not exist
 */
floorRouter.get('/:id', async (req: Request & { auth: any }, res: Response, next: NextFunction) => {
    try {
        const floor = await floorService.getFloorById(Number(req.params.id));
        res.status(200).json(floor);
    } catch (error) {
        res.status(400).json({
            status: '400',
            errorMessage: `Floor with id ${req.params.id} does not exist.`,
        });
    }
});

/**
 * @swagger
 * /floors/{id}/positions:
 *   get:
 *     summary: Get positions for a floor
 *     tags: [Floors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Floor ID
 *     responses:
 *       200:
 *         description: List of positions for the floor
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Position'
 *       400:
 *         description: Floor with specified ID does not exist
 */
floorRouter.get(
    '/:id/positions',
    async (req: Request & { auth: any }, res: Response, next: NextFunction) => {
        try {
            const floor = await floorService.getFloorPositions(Number(req.params.id));
            res.status(200).json(floor);
        } catch (error) {
            res.status(400).json({
                status: '400',
                errorMessage: `Floor with id ${req.params.id} does not exist.`,
            });
        }
    }
);

/**
 * @swagger
 * /floors/{id}/position:
 *   put:
 *     summary: Update a position
 *     tags: [Floors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Floor ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PositionUpdate'
 *     responses:
 *       200:
 *         description: Position updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Position'
 *       400:
 *         description: Something went wrong with updating the position
 */
floorRouter.put(
    '/:id/position',
    async (req: Request & { auth: any }, res: Response, next: NextFunction) => {
        try {
            const updatedPosition = await floorService.updatePosition(
                Number(req.params.id),
                req.body as PositionUpdate
            );
            res.status(200).json(updatedPosition);
        } catch (error) {
            res.status(400).json({
                status: '400',
                errorMessage: 'Something went wrong with updating the position.',
            });
        }
    }
);

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Floor:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The floor ID
 *         name:
 *           type: string
 *           description: The floor name
 *         description:
 *           type: string
 *           description: The floor description
 *       required:
 *         - id
 *         - name
 *     Position:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The position ID
 *         name:
 *           type: string
 *           description: The position name
 *         floorId:
 *           type: integer
 *           description: The ID of the floor the position belongs to
 *       required:
 *         - id
 *         - name
 *         - floorId
 *     PositionUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The new name of the position
 *       required:
 *         - name
 */

export { floorRouter };
