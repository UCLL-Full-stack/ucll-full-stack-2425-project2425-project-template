import express, { Request, Response, NextFunction } from 'express';
import userService from '../service/user.service';
import { User } from '../types'; // Adjust this import if necessary

const userRouter = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieve all users
 *     description: Returns a list of all users.
 *     responses:
 *       200:
 *         description: Successfully fetched all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   role:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
userRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Call the service to get all users
    const users = await userService.getAllUsers();

    // Return the list of users
    res.status(200).json(users);
  } catch (error) {
    next(error);  // Pass the error to the error-handling middleware
  }
});

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a user with username and password.
 *     description: Returns a JWT token upon successful authentication.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
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
 *                   example: "Authentication successful"
 *                 token:
 *                   type: string
 *                   description: The JWT token
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */
userRouter.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Get email and password from the request body
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const authResponse = await userService.authenticate({ email, password });
    res.status(200).json({
      message: "Authentication successful",
      response: authResponse,
    });
  } catch (error) {
    next(error);
  }
});

export { userRouter };
