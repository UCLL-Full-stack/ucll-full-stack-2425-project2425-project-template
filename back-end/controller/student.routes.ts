import express, { NextFunction, Request, Response } from 'express';
import studentService from '../service/student.service';
import { StudentInput } from '../types';
import { Student } from '@prisma/client';

const studentRouter = express.Router();

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
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     description: Unique identifier for the student
 *                   username:
 *                     type: string
 *                     description: The username of the student
 *                   email:
 *                     type: string
 *                     description: Email address of the student
 *                   studentNumber:
 *                     type: string
 *                     description: The student number of the student
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
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 studentNumber:
 *                   type: string
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
 *                   example: Student not found.
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
 * /students/signup:
 *   post:
 *     summary: Create a new student
 *     description: Creates a new student with the provided details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the student
 *               email:
 *                 type: string
 *                 description: The email address of the student
 *               password:
 *                 type: string
 *                 description: The password for the student account
 *               studentNumber:
 *                 type: string
 *                 description: The unique student number
 *     responses:
 *       201:
 *         description: Student created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 studentNumber:
 *                   type: string
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
 *                   example: An error occurred while creating the student.
 */
studentRouter.post('/signup', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const studentInput = <StudentInput>req.body;
    const newStudent = await studentService.createStudent(studentInput);
    res.status(201).json(newStudent);
  } catch (error) {
    next(error);
  }
});


/**
 * @swagger
 * /students/login:
 *   post:
 *     summary: Authenticate a student
 *     description: Authenticates a student using their username and password, and returns a token if successful.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the student.
 *               password:
 *                 type: string
 *                 description: The password of the student.
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Authentication successful
 *                 token:
 *                   type: string
 *                   description: JWT token for authentication
 *                 userId:
 *                   type: string
 *                   description: The ID of the authenticated student
 *       400:
 *         description: Invalid username or password
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
 *                   example: Invalid username or password
 *       500:
 *         description: Internal server error
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
 *                   example: An error occurred while processing the request.
 */
studentRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try{
    const studentInput = <StudentInput>req.body
    const response = await studentService.authenticate(studentInput);
    res.status(200).json({ message: "Authentication successful", ...response });
  } catch (error) {
    next(error);
  }
});

export { studentRouter };
