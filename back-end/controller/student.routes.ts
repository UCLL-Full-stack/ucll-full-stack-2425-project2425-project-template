import express, { NextFunction, Request, Response } from 'express';
import studentService from '../service/student.service';
import { StudentInput } from '../types';
import { Student } from '@prisma/client';

const studentRouter = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the student
 *           example: 1
 *         username:
 *           type: string
 *           description: The username of the student
 *           example: johndoe
 *         email:
 *           type: string
 *           description: Email address of the student
 *           example: johndoe@example.com
 *         studentNumber:
 *           type: string
 *           description: The student number of the student
 *           example: S12345
 */

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Retrieve all students
 *     description: Returns a list of all students, including their details.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of students
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Student'
 *       400:
 *         description: Error occurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 errorMessage:
 *                   type: string
 *                   example: An error occurred while retrieving students.
 */

studentRouter.get('/', async (req: Request, res: Response) => {
  try {
    const students = await studentService.getAllStudents();
    res.status(200).json(students);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ status: 'error', errorMessage: err.message });
  }
});

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     summary: Retrieve a student by ID
 *     description: Returns the details of a specific student identified by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the student to retrieve.
 *         schema:
 *           type: integer
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Student details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       404:
 *         description: Student not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 errorMessage:
 *                   type: string
 *                   example: Student with ID {id} does not exist.
 *       400:
 *         description: Error occurred
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 errorMessage:
 *                   type: string
 *                   example: Invalid Student ID.
 */
studentRouter.get('/:id', async (req: Request, res: Response) => {
  const studentId = Number(req.params.id);
  try {
    const student = await studentService.getStudentById(studentId);
    res.status(200).json(student);
  } catch (error) {
    const err = error as Error;
    if (err.message.includes("does not exist")) {
      res.status(404).json({ status: "error", errorMessage: err.message });
    } else {
      res.status(400).json({ status: "error", errorMessage: err.message });
    }
  }
});


/**
 * @swagger
 * /students/{username}:
 *   get:
 *     summary: Get student by username
 *     description: Fetch a student's information by their username.
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         description: The username of the student to fetch.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved student data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 username:
 *                   type: string
 *                   example: "john_doe"
 *                 firstName:
 *                   type: string
 *                   example: "John"
 *                 lastName:
 *                   type: string
 *                   example: "Doe"
 *                 email:
 *                   type: string
 *                   example: "john@example.com"
 *       400:
 *         description: Bad request or validation error.
 *       404:
 *         description: Student not found with the given username.
 *       500:
 *         description: Internal server error.
 */
studentRouter.get('/:username', async (req: Request, res: Response) => {
  const username = req.params.username
  try {
    const student = await studentService.getStudentByUsername(username);
    res.status(200).json(student);
  } catch (error) {
    const err = error as Error;
    if (err.message.includes("does not exist")) {
      res.status(404).json({ status: "error", errorMessage: err.message });
    } else {
      res.status(400).json({ status: "error", errorMessage: err.message });
    }
  }
});

/**
 * @swagger
 * /students:
 *   post:
 *     summary: Create a new student
 *     description: Adds a new student to the system.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentNumber:
 *                 type: string
 *                 description: The student number.
 *                 example: S12345
 *               userId:
 *                 type: integer
 *                 description: The user ID associated with the student.
 *                 example: 1
 *     responses:
 *       201:
 *         description: Student created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
 *       400:
 *         description: Error occurred.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: error
 *                 errorMessage:
 *                   type: string
 *                   example: Student number and user ID are required.
 */
studentRouter.post('/', async (req: Request, res: Response) => {
  try {
    const student = await studentService.createStudent(req.body);
    res.status(201).json(student);
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ status: 'error', errorMessage: err.message });
  }
});

export { studentRouter };
