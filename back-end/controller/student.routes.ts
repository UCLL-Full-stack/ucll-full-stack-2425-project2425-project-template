import express, { Request, Response } from 'express';

const studentRouter = express.Router();

/**
 * @swagger
 * /students:
 *   get:
 *     summary: Retrieve all students
 *     description: Returns a list of all students, including their details.
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
 *                   name:
 *                     type: string
 *                     description: The name of the student
 *                   email:
 *                     type: string
 *                     description: Email address of the student
 *                   enrolledTrips:
 *                     type: array
 *                     description: List of trips the student is enrolled in
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: integer
 *                         destination:
 *                           type: string
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


// Get a user by ID
studentRouter.get('/:id', async (req: Request, res: Response) => {
  try {
    const studentId = Number(req.params.id);
    const student = studentService.getStudentById(studentId);

    if (student) {
      res.status(200).json(student);
    } else {
      res.status(404).send('Student not found');
    }
  } catch (error) {
    const err = error as Error;
    res.status(400).json({ status: "error", errorMessage: err.message });
  }
});


export { studentRouter };
