import { Router, Request, Response, NextFunction } from 'express';
import exerciseService from '../service/exercise.service';
import { ExerciseInput } from '../types';

const exerciseRouter = Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Exercise:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         videoLink:
 *           type: string
 *           format: uri
 *     ExerciseInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         videoLink:
 *           type: string
 *           format: uri
 */

/**
 * @swagger
 * /exercises:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get all exercises
 *     tags: [Exercises]
 *     description: Retrieve a list of all exercises.
 *     responses:
 *       200:
 *         description: A list of exercises.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Exercise'
 */
exerciseRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const exercises = await exerciseService.getAllExercises();
        res.status(200).json(exercises);
    } catch (error: any) {
        const errorMessage = error.message || 'An unexpected error occurred';
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

/**
 * @swagger
 * /exercises/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get an exercise by ID
 *     tags: [Exercises]
 *     description: Retrieve a single exercise by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The exercise ID
 *     responses:
 *       200:
 *         description: An exercise object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exercise'
 *       404:
 *         description: Exercise not found
 */
exerciseRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const exerciseId = req.params.id;
        const exercise = await exerciseService.getExerciseById(exerciseId);
        if (!exercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }
        res.status(200).json(exercise);
    } catch (error: any) {
        const errorMessage = error.message || 'An unexpected error occurred';
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

/**
 * @swagger
 * /exercises/{id}:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Toggle favorite status
 *     tags: [Exercises]
 *     description: Toggle the favorite status of an exercise.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The exercise ID
 *     responses:
 *       200:
 *         description: The updated exercise object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exercise'
 *       404:
 *         description: Exercise not found
 */

exerciseRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const exerciseId = req.params.id;
        const exercise = await exerciseService.toggleFavorite(exerciseId);
        if (!exercise) {
            return res.status(404).json({ message: 'Exercise not found' });
        }
        res.status(200).json(exercise);
    } catch (error: any) {
        const errorMessage = error.message || 'An unexpected error occurred';
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

/**
 * @swagger
 * /exercises:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new exercise
 *     tags: [Exercises]
 *     description: Create a new exercise.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ExerciseInput'
 *     responses:
 *       200:
 *         description: The exercise was successfully created.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Exercise'
 */
exerciseRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const exerciseInput: ExerciseInput = req.body;
        const result = await exerciseService.createExercise(exerciseInput);
        res.status(200).json(result);
    } catch (error: any) {
        const errorMessage = error.message || 'An unexpected error occurred';
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

export default exerciseRouter;
