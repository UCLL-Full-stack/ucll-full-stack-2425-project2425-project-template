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

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Trainer:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             email:
 *               type: string
 *         pokemon:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Pokemon'
 *     Pokemon:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *         name:
 *           type: string
 *         type:
 *           type: string
 *         stats:
 *           type: object
 *           properties:
 *             hp:
 *               type: number
 *             attack:
 *               type: number
 *             defence:
 *               type: number
 *             specialAttack:
 *               type: number
 *             specialDefence:
 *               type: number
 *             speed:
 *               type: number
 */
trainerRouter.get('/:id/pokemon', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const trainer = await trainerService.getTrainerById(Number(req.params.id));
        if (!trainer) {
            return res.status(404).json({ message: 'Trainer not found' });
        }
        const pokemon = trainer.getPokemon();
        res.status(200).json(pokemon);
    } catch (error) {
        next(error);
    }
});


export {trainerRouter};