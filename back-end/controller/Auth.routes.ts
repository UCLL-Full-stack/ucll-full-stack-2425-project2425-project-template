import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
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
 *           example:
 *             username: "admin"
 *             password: "adminpassword"
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
 *       400:
 *         description: Missing username, password, or role
 *       401:
 *         description: Invalid username or password
 *       500:
 *         description: Internal server error
 */
authRouter.post('/login', async (req: Request, res: Response) => {
  const { username, password, role } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and Password are required' });
  }

  try {
    let user = await AuthService.getUserByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.getPassword()))) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ id: user.id, username: user.getUsername(), role }, secretKey, { expiresIn: '1h' });

    return res.json({ token, username: user.getUsername(), role });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

export { authRouter };