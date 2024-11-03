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
 *           description: Unique identifier for the trainer
 *         name:
 *           type: string
 *           description: Trainer name
 *         user:
 *           type: object
 *           properties:
 *             id:
 *               type: number
 *               description: Unique identifier for the user
 *             firstName:
 *               type: string
 *               description: First name of the user
 *             lastName:
 *               type: string
 *               description: Last name of the user
 *             email:
 *               type: string
 *               description: Email of the user
 *         pokemon:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Pokemon'
 *     Pokemon:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           description: Unique identifier for the Pokemon
 *         name:
 *           type: string
 *           description: Name of the Pokemon
 *         type:
 *           type: string
 *           description: Type of the Pokemon (e.g., fire, water)
 *         stats:
 *           type: object
 *           properties:
 *             hp:
 *               type: number
 *               description: Health points of the Pokemon
 *             attack:
 *               type: number
 *               description: Attack power of the Pokemon
 *             defence:
 *               type: number
 *               description: Defence power of the Pokemon
 *             specialAttack:
 *               type: number
 *               description: Special attack power of the Pokemon
 *             specialDefence:
 *               type: number
 *               description: Special defence power of the Pokemon
 *             speed:
 *               type: number
 *               description: Speed of the Pokemon
 */
import express, { NextFunction, Request, Response } from 'express';
import trainerService from '../service/trainer.service';
import { PokemonInput } from '../types';

const trainerRouter = express.Router();

/**
 * @swagger
 * /trainers:
 *   get:
 *     summary: Retrieve a list of all trainers
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of trainers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Trainer'
 *       500:
 *         description: Server error
 */
trainerRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const trainers = await trainerService.getAllTrainers();
        res.status(200).json(trainers);
    } catch (error) {
        next(error);
    }
});


/**
 * @swagger
 * /trainers/{id}:
 *   get:
 *     summary: Get a trainer by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the trainer
 *     responses:
 *       200:
 *         description: A single trainer object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Trainer'
 *       404:
 *         description: Trainer not found
 *       500:
 *         description: Server error
 */

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
 * /trainers/{id}/pokemon:
 *   get:
 *     summary: Get all Pokemon for a specific trainer
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the trainer
 *     responses:
 *       200:
 *         description: List of Pokemon for the specified trainer
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pokemon'
 *       404:
 *         description: Trainer not found
 *       500:
 *         description: Server error
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


/**
 * @swagger
 * /trainers/{id}:
 *   post:
 *     summary: Add a new Pokemon to a specific trainer
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the trainer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pokemon'
 *     responses:
 *       200:
 *         description: Pokemon successfully added
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pokemon'
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Trainer not found
 *       500:
 *         description: Server error
 */
trainerRouter.post('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const pokemon = <PokemonInput>req.body;
        const result = await trainerService.addPokemonToTrainerById(Number(req.params.id),pokemon)
        res.status(200).json(result);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({message:error.message})
        } else {
            next(error)         
        }
    }
})


export {trainerRouter};