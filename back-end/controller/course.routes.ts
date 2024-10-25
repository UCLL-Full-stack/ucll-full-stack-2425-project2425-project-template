/**
 * @swagger
 *   components:
 *     securitySchemes:
 *       bearerAuth:
 *         type: http
 *         scheme: bearer
 *         bearerFormat: JWT
 *     schemas:
 *       Course:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *             format: int64
 *           name:
 *             type: string
 *             description: Course name.
 *           description:
 *             type: string
 *             description: Course description.
 *           phase:
 *             type: number
 *             description: Course phase.
 *           credits:
 *             type: number
 *             description: Course credits.
 *           lecturers: 
 *             type: array
 *             items:
 *               type: string
 *           isElective:
 *             type: boolean
 *       CourseShortView:
 *         type: object
 *         properties:
 *           id:
 *             type: number
 *             format: int64
 *           name:
 *             type: string
 *             description: Course name.
 *           phase:
 *             type: number
 *             description: Course phase.
 *           credits:
 *             type: number
 *             description: Course credits.
 */

import express, { NextFunction, Request, Response } from 'express';
import courseService from '../service/course.service';
import { CourseUpdateView } from '../types/courseUpdateView';

const courseRouter = express.Router();

/**
 * @swagger
 * /courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Course]
 *     responses:
 *       200:
 *         description: All courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */
courseRouter.get("/" , async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json(courseService.getAll());
    } catch (error) {
        next(error);
    }
});


/**
 * @swagger
 * /courses/short:
 *   get:
 *     summary: Get all courses
 *     tags: [Course]
 *     responses:
 *       200:
 *         description: All courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Course'
 */
courseRouter.get("/short" , async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json(courseService.getAllShort());
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /courses/{id}:
 *   get:
 *     summary: Get a course by ID.
 *     tags: [Course]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The id of the course to retrieve.
 *     responses:
 *       200:
 *         description: Successfully retrieved course.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 */
courseRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json(courseService.getCourseById(parseInt(req.params.id)));
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /courses/delete:
 *   delete:
 *     summary: Delete courses by IDs
 *     tags: [Course]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               type: number
 *               description: The IDs of the courses to delete.
 *     responses:
 *       200:
 *         description: Courses are successfully deleted
 */
courseRouter.delete('/delete', async (req: Request<{}, {}, number[]>, res: Response, next: NextFunction) => {
    try {
        const courseIds: number[] = req.body;
        const operationStatus : String= courseService.deleteCourses(courseIds);
        res.status(200).send(operationStatus);
    } catch (error) {
        next(error);
    }
});

/**
 * @swagger
 * /courses/{id}:
 *   put:
 *     summary: Update a course by ID.
 *     tags: [Course]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Course'
 *     responses:
 *       200:
 *         description: Successfully updated course.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Course'
 */
courseRouter.put('/:id', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const course : CourseUpdateView = req.body;
        res.status(200).json(courseService.updateCourse(parseInt(req.params.id), course));
    } catch (error) {
        next(error);
    }
});

export {
    courseRouter
};