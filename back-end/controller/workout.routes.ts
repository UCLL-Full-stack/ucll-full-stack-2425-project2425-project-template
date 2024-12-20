/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Workout:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         user:
 *           $ref: '#/components/schemas/User'
 *         exercises:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Exercise'
 *     WorkoutInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         user:
 *           $ref: '#/components/schemas/UserInput'
 *         exercises:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/ExerciseInput'
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
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *         role:
 *           $ref: '#/components/schemas/Role'
 *     UserInput:
 *       type: object
 *       properties:
 *         firstName:
 *           type: string
 *         lastName:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         password:
 *           type: string
 *         role:
 *           $ref: '#/components/schemas/Role'
 *     Role:
 *       type: string
 *       enum: [admin, user]
 */

import express, { Router, Request, Response, NextFunction } from 'express';
import workoutService from '../service/workout.service';

const workoutRouter = express.Router();

/**
 * @swagger
 * /workouts:
 *   get:
 *     security:
 *       - bearerAuth: []
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
workoutRouter.get('/', async (req: Request, res: Response) => {
    try {
        const workouts = await workoutService.getAllWorkouts();
        res.status(200).json(workouts);
    } catch (error: any) {
        const errorMessage = error.message || 'An unexpected error occurred';
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

/**
 * @swagger
 * /workouts/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get a workout by ID
 *     tags: [Workouts]
 *     description: Retrieve a single workout by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
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
workoutRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const workoutId = req.params.id;
        const workout = await workoutService.getWorkoutById(workoutId);
        res.status(200).json(workout);
    } catch (error: any) {
        const errorMessage = error.message || 'An unexpected error occurred';
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

/**
 * @swagger
 * /workouts/user/{id}:
 *   get:
 *     security:
 *       - bearerAuth: []
 *     summary: Get workouts by user ID
 *     tags: [Workouts]
 *     description: Retrieve workouts associated with a specific user.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
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
workoutRouter.get('/user/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.params.id;
        const workouts = await workoutService.getWorkoutsByUserId(userId);
        res.status(200).json(workouts);
    } catch (error: any) {
        const errorMessage = error.message || 'An unexpected error occurred';
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

/**
 * @swagger
 * /workouts:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Create a new workout
 *     tags:
 *       - Workouts
 *     description: Create a new workout entry in the database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/WorkoutInput'
 *     responses:
 *       200:
 *         description: The created workout object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 */
workoutRouter.post('/', async (req: Request, res: Response) => {
    try {
        const workoutInput = req.body;
        const newWorkout = await workoutService.createWorkout(workoutInput);
        res.status(200).json(newWorkout);
    } catch (error: any) {
        const errorMessage = error.message || 'An unexpected error occurred';
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

/**
 * @swagger
 * /workouts/{workoutId}/exercises/{exerciseId}:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Add an exercise to a workout
 *     tags: [Workouts]
 *     description: Add an exercise to a specific workout by their IDs.
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         schema:
 *           type: string
 *         required: true
 *         description: The workout ID
 *       - in: path
 *         name: exerciseId
 *         schema:
 *           type: string
 *         required: true
 *         description: The exercise ID
 *     responses:
 *       200:
 *         description: The updated workout object with the new exercise.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 *       404:
 *         description: Workout or exercise not found
 */
workoutRouter.post(
    '/:workoutId/exercises/:exerciseId',
    (req: Request, res: Response, next: NextFunction) => {
        try {
            const workoutId = req.params.workoutId;
            const exerciseId = req.params.exerciseId;
            const updatedWorkout = workoutService.addExerciseToWorkout(workoutId, exerciseId);
            res.status(200).json(updatedWorkout);
        } catch (error: any) {
            const errorMessage = error.message || 'An unexpected error occurred';
            res.status(400).json({ status: 'error', errorMessage: errorMessage });
        }
    }
);

/**
 * @swagger
 * /workouts/{workoutId}/exercises/{exerciseId}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Remove an exercise from a workout
 *     tags: [Workouts]
 *     description: Remove an exercise from a specific workout by their IDs.
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         schema:
 *           type: string
 *         required: true
 *         description: The workout ID
 *       - in: path
 *         name: exerciseId
 *         schema:
 *           type: string
 *         required: true
 *         description: The exercise ID
 *     responses:
 *       200:
 *         description: The updated workout object without the exercise.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 *       404:
 *         description: Workout or exercise not found
 */
workoutRouter.delete('/:workoutId/exercises/:exerciseId', (req: Request, res: Response) => {
    try {
        const workoutId = req.params.workoutId;
        const exerciseId = req.params.exerciseId;
        const updatedWorkout = workoutService.removeExerciseFromWorkout(workoutId, exerciseId);
        res.status(200).json(updatedWorkout);
    } catch (error: any) {
        const errorMessage = error.message || 'An unexpected error occurred';
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

/**
 * @swagger
 * /workouts/{id}:
 *   delete:
 *     security:
 *       - bearerAuth: []
 *     summary: Remove a workout
 *     tags: [Workouts]
 *     description: Remove a workout by its ID and return the removed workout.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The workout ID
 *     responses:
 *       200:
 *         description: The removed workout object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 *       404:
 *         description: Workout not found
 */
workoutRouter.delete('/:id', (req: Request, res: Response) => {
    try {
        const workoutId = req.params.id;
        const deletedWorkout = workoutService.removeWorkout(workoutId);
        res.status(200).json(deletedWorkout);
    } catch (error: any) {
        const errorMessage = error.message || 'An unexpected error occurred';
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

/**
 * @swagger
 * /workouts:
 *   put:
 *     security:
 *       - bearerAuth: []
 *     summary: Update a workout
 *     tags: [Workouts]
 *     description: Update a workout by its ID and return the updated workout.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Workout'
 *     responses:
 *       200:
 *         description: The updated workout object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 *       404:
 *         description: Workout not found
 */
workoutRouter.put('/', (req: Request, res: Response) => {
    try {
        const updatedWorkout = workoutService.updateWorkout(req.body);
        res.status(200).json(updatedWorkout);
    } catch (error: any) {
        const errorMessage = error.message || 'An unexpected error occurred';
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});

/**
 * @swagger
 * /workouts/{workoutId}/assign/{userId}:
 *   post:
 *     security:
 *       - bearerAuth: []
 *     summary: Assign a workout to a user
 *     tags: [Workouts]
 *     description: Assign a workout to a specific user by their IDs.
 *     parameters:
 *       - in: path
 *         name: workoutId
 *         schema:
 *           type: string
 *         required: true
 *         description: The workout ID
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: The updated workout object with the assigned user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Workout'
 *       404:
 *         description: Workout or user not found
 */
workoutRouter.post('/:workoutId/assign/:userId', async (req: Request, res: Response) => {
    try {
        const { workoutId, userId } = req.params;

        // Call the workout service to assign the workout to the user
        const updatedWorkout = await workoutService.assignWorkoutToUser(workoutId, userId);

        res.status(200).json(updatedWorkout);
    } catch (error: any) {
        const errorMessage = error.message || 'An unexpected error occurred';
        res.status(400).json({ status: 'error', errorMessage: errorMessage });
    }
});



export default workoutRouter;
