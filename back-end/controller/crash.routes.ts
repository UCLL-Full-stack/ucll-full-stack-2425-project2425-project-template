/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Crash:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         type:
 *           type: string
 *           description: Crash type.
 *         description:
 *           type: string
 *           description: Crash description.
 *         casualties:
 *           type: number
 *           description: Number of casualties.
 *         deaths:
 *           type: number
 *           description: Number of deaths.
 *         participants:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Participant'
 */
import express, { NextFunction, Response, Request } from 'express';
import raceService from '../service/Race.service';
import crashService from '../service/Crash.service';

const crashRouter = express.Router();

/**
 * @swagger
 * /crashes/{id}:
 *   get:
 *     summary: Get a crash by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the crash to get
 *     responses:
 *       200:
 *         description: A crash object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Crash'
 */
crashRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const crash = await crashService.getCrashById(Number(req.params.id));
        if (crash) {
            res.status(200).json(crash);
        } else {
            res.status(404).json({ message: 'Crash not found' });
        }
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /crashes:
 *   get:
 *     summary: Retrieve a list of all crashes
 *     responses:
 *       200:
 *         description: A list of crashes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Crash'
 */
crashRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const
            crashes = await raceService.getAllCrashes();
        res.status(200).json(crashes);
    } catch (error) {
        next(error);
    }
});

export { crashRouter };