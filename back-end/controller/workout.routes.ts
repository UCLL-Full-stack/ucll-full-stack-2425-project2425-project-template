import express, { Router, Request, Response, NextFunction } from "express";
import workoutService from "../service/workout.service";

const workoutRouter = express.Router();

/**
 * @swagger
 * /workouts:
 *   get:
 *     summary: Get all workouts
 *     tags: [Workouts]
 *     description: Retrieve a list of all workouts.
 *     responses:
 *       200:
 *         description: A list of workouts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
workoutRouter.get('/', (req: Request, res: Response, next: NextFunction) => {
    try{
        const workouts = workoutService.getAllWorkouts()
        res.status(200).json(workouts)
    }catch (error) {
        next(error)
    }
});

/**
 * @swagger
 * /workouts/{id}:
 *   get:
 *     summary: Get a workout by ID
 *     tags: [Workouts]
 *     description: Retrieve a single workout by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The workout ID
 *     responses:
 *       200:
 *         description: A workout object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
workoutRouter.get('/:id', (req: Request, res: Response, next: NextFunction) => {
    try{
        const workoutId = parseInt(req.params.id)
        const workout = workoutService.getWorkoutById(workoutId)
        res.status(200).json(workout)
    }catch(error){
        next(error)
    }
})

/**
 * @swagger
 * /workouts/user/{id}:
 *   get:
 *     summary: Get workouts by user ID
 *     tags: [Workouts]
 *     description: Retrieve workouts associated with a specific user.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: A list of workouts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 */
workoutRouter.get('/user/:id', (req: Request, res: Response, next: NextFunction) => {
    try{
        const userId = parseInt(req.params.id)
        const workouts = workoutService.getWorkoutsByUserId(userId)
        res.status(200).json(workouts)
    }catch(error){
        next(error)
    }
})

/**
 * @swagger
 * /workouts:
 *   post:
 *     summary: Create a new workout
 *     tags: [Workouts]
 *     description: Create a new workout entry in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: The created workout object.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 */
workoutRouter.post('/', (req: Request, res: Response, next: NextFunction) => {
    try{
        const workoutInput = req.body
        const newWorkout = workoutService.createWorkout(workoutInput)
        res.status(201).json(newWorkout)
    }catch(error){
        next(error)
    }
})

export default workoutRouter;
