import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import AuthService from '../service/Auth.Service';

const authRouter = express.Router();
const secretKey = process.env.JWT_SECRET || 'your_secret_key';

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication related endpoints
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user or admin
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *             required:
 *               - username
 *               - password
 *               - role
 *           example:
 *             username: "admin"
 *             password: "adminpassword"
 *             role: "admin"
 *     responses:
 *       200:
 *         description: Successful login
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 username:
 *                   type: string
 *                 role:
 *                   type: string
 *       400:
 *         description: Missing username, password, or role
 *       401:
 *         description: Invalid username or password
 *       500:
 *         description: Internal server error
 */
authRouter.post('/login', async (req: Request, res: Response) => {
  const { username, password, role } = req.body;

  // Validate the request
  if (!username || !password || !role) {
    return res.status(400).json({ message: 'Username, password, and role are required' });
  }

  try {
    let user;
    if (role === 'admin') {
      user = await AuthService.getAdminByUsername(username);
    } else {
      user = await AuthService.getUserByUsername(username);
    }

    // Check if the user exists and the password is correct
    if (!user || user.getPassword() !== password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.getId(), username: user.getUsername(), role }, secretKey, { expiresIn: '1h' });

    // Return the token and user info
    return res.json({ token, username: user.getUsername(), role });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export { authRouter } ;