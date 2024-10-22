/**
 * @swagger
 *   components:
 *    securitySchemes:
 *     bearerAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *    schemas:
 *      Chat:
 *          type: object
 *          properties:
 *            id:
 *              type: number
 *              format: int64
 *            message:
 *              type: string
 *              description: chat message.
 *            createdAt:
 *              type: Date
 *              description: chat createdAt.
 *        
 * 
 */



import express, { Request, Response,NextFunction } from 'express';
import chatservice from '../service/chat.service';
const chatRouter = express.Router();

/**
 * @swagger
 * /chats:
 *   get:
 *     summary: Get all chat
 *     tags: [Chats]
 *     responses:
 *       200:
 *         description: The list of chats.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Chat'
 */



chatRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {;
try {
    const users = await chatservice.getAllChat();
    res.json(users);
  } catch (error) {
    next(error);
    
  }
});



/**
 * @swagger
 * /chats/{id}:
 *   get:
 *     summary: Get a chat by ID.
 *     description: Returns a chat object by the provided chat ID.
 *     tags: [Chats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: ID of the chat to retrieve.
 *     responses:
 *       200:
 *         description: A chat object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chat'
 *       404:
 *         description: chat not found.
 */
chatRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
      const id = parseInt(req.params.id, 10); // Extract and parse the ID from the path
      const chat = await chatservice.getChatById({ id }); // Call the service to get chat by ID
      res.status(200).json(chat); // Return the chat data if found
  } catch (error) {
      next(error) // Handle errors (e.g., chat not found)
  }
});



/**
 * @swagger
 * /chats/user/{id}:
 *   get:
 *     summary: Get a chat by UserID.
 *     description: Returns a chat object by the provided user ID.
 *     tags: [Chats]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           format: int64
 *         description: user ID of the chat to retrieve.
 *     responses:
 *       200:
 *         description: A chat object.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chat'
 *       404:
 *         description: chat not found.
 */
chatRouter.get('/user/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
      const userId = parseInt(req.params.id, 10); // Extract and parse the ID from the path
      const chat = await chatservice.getChatByUserId({ userId }); // Call the service to get lecturer by ID
      res.status(200).json(chat); // Return the lecturer data if found
  } catch (error) {
      next(error) // Handle errors (e.g., lecturer not found)
  }
});

export { chatRouter };