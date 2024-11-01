/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Trainer:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            name:
 *              type: string
 *              description: Trainer name.
 */
import express, { NextFunction, Request, Response } from 'express';
import trainerService from '../service/trainer.service';

const trainerRouter = express.Router();

trainerRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const trainers = await trainerService.getAllTrainers();
        res.status(200).json(trainers);
    } catch (error) {
        next(error);
    }
});

trainerRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const trainer = await trainerService.getTrainerById(Number(req.params.id));
        res.status(200).json(trainer)
    } catch (error) {
        next(error)
    }
})

export {trainerRouter};