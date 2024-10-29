import { Router, Request, Response, NextFunction } from 'express';
import exerciseService from '../service/exercise.service';

const exerciseRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Exercise:
 *       type: object
 *       properties:
 *         id:
 *           type: number
 *           format: int64
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         video_link:
 *           type: string
 *           format: uri
 *     ExerciseInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         video_link:
 *           type: string
 *           format: uri
 */

/**
 * @swagger
 * /exercises:
 *   get:
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
exerciseRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    try {
        const exercises = exerciseService.getAllExercises();
        res.status(200).json(exercises);
    } catch (error: any) { 
        const errorMessage = error.message || "An unexpected error occurred";
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

/**
 * @swagger
 * /exercises/{id}:
 *   get:
 *     summary: Get an exercise by ID
 *     tags: [Exercises]
 *     description: Retrieve a single exercise by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
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
exerciseRouter.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    try {
        const exerciseId = parseInt(req.params.id);
        const exercise = exerciseService.getExerciseById(exerciseId);
        res.status(200).json(exercise);
    } catch (error: any) { 
        const errorMessage = error.message || "An unexpected error occurred";
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

export default exerciseRouter;