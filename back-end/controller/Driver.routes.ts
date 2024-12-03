import express, { Request, Response, NextFunction } from 'express';
import driverService from '../service/Driver.service';

const driverRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Drivers
 *   description: Driver management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Driver:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         name:
 *           type: string
 *         surname:
 *           type: string
 *         birthdate:
 *           type: string
 *           format: date
 *         team:
 *           type: string
 *         country:
 *           type: string
 *         description:
 *           type: string
 */

/**
 * @swagger
 * /drivers/{id}:
 *   get:
 *     summary: Retrieve a driver by ID
 *     tags: [Drivers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The driver ID
 *     responses:
 *       200:
 *         description: A driver object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Driver'
 *       404:
 *         description: Driver not found
 *       500:
 *         description: Internal server error
 */
driverRouter.get('/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    try {
        const driver = await driverService.getDriverById(id);
        if (driver) {
            res.json(driver);
        } else {
            res.status(404).json({ message: 'Driver not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

export { driverRouter };