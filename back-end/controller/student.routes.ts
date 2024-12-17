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

export { studentRouter };
