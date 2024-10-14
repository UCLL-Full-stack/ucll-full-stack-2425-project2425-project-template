import express, { Router, Request, Response, NextFunction } from "express";
import workoutexerciseService from "../service/workoutexercise.service";

const workoutExerciseRouter = Router();

/**
 * @swagger
 * /workoutExercises:
 *   get:
 *     summary: Retrieve all workout exercises
 *     tags: [Workout Exercises]
 *     responses:
 *       200:
 *         description: A list of workout exercises
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Internal server error
 */
workoutExerciseRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    try{
        const workoutExercises = workoutexerciseService.getAllWorkoutExercises()
        res.status(200).json(workoutExercises)
    }catch (error) {
        next(error)
    }
});

/**
 * @swagger
 * /workoutExercises/{id}:
 *   get:
 *     summary: Get a workout exercise by ID
 *     tags: [Workout Exercises]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the workout exercise to get
 *     responses:
 *       200:
 *         description: A single workout exercise
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       404:
 *         description: Workout exercise not found
 *       500:
 *         description: Internal server error
 */
workoutExerciseRouter.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    try{
        const workoutExerciseId = parseInt(req.params.id)
        const workoutExercise = workoutexerciseService.getWorkoutExerciseById(workoutExerciseId)
        res.status(200).json(workoutExercise)
    }catch(error){
        next(error)
    }
})

/**
 * @swagger
 * /workoutExercises/workout/{id}:
 *   get:
 *     summary: Get exercises by workout ID
 *     tags: [Workout Exercises]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the workout to get exercises for
 *     responses:
 *       200:
 *         description: List of exercises for the workout
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       404:
 *         description: Workout not found
 *       500:
 *         description: Internal server error
 */
workoutExerciseRouter.get('/workout/:id', (req: Request, res: Response, next: NextFunction) => {
    try{
        const workoutId = parseInt(req.params.id)
        const workoutExercises = workoutexerciseService.getWorkoutExercisesByWorkoutId(workoutId)
        res.status(200).json(workoutExercises)
    }catch(error){
        next(error)
    }
})

export default workoutExerciseRouter;
